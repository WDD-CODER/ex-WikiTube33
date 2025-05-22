'use strict';
// const G_CACHE_KEY = 'gCacheDB'
// const WIKI_CACHE_KEY = 'wikiCacheDB'


function getWikipediaQuery(onSuccess) {
    const searchValue = 'David Bowie'
    const WikipediaUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${searchValue}&srlimit=5&format=json`
    if (isWikiInCache(searchValue)) {
        console.log('from cache')
        return Promise.resolve(gCache).then(onSuccess)
    }
    
    return axios.get(WikipediaUrl)
    .then(res => {
        console.log('from Ajax')
        return res.data.query
    })
    .then(ans => {
        let formattedAns = formattedWikiData(ans,searchValue)
        updateGCache(formattedAns)
        saveToStorage(G_CACHE_KEY, gCache)
        onSuccess(formattedAns)
        })
        .catch(() => { console.log('problem loading wiki api') })

}

// LIST
// CREATE
// READ
function isWikiInCache(str) {
    if (!gCache.length) return false 
    const parameter = 'searchTitle'
    const exist = gCache.some(item => item[parameter].title === str[parameter].title)
    return exist
}

function getGCache() {
    return gCache
}

// UPDATE 
function formattedWikiData(data,searchValue) {
    // const suggestion = data['searchinfo'].suggestion
    var formattedArray = data.search.map(item => {
        const { title, snippet } = item
        let text = snippet
        let articleTitle = title
        let searchTitle = searchValue
        const formattedData = { searchTitle, articleTitle, text }
        return formattedData
    })
    return formattedArray
}


// DELETE
