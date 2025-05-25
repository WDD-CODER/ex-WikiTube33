'use strict';
// const G_CACHE_KEY = 'gCacheDB'
// const WIKI_CACHE_KEY = 'wikiCacheDB'


function getWikipediaQuery(str) {
    const searchValue = str || getGVideo()
    const WikipediaUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${searchValue}&srlimit=5&format=json`
    if (isWikiInCache(searchValue)) {
        console.log('from cache')
        return Promise.resolve(gCache)
    }

    return axios.get(WikipediaUrl)
        .then(res => {
            console.log('from Ajax')
            return res.data.query
        })
        .then(ans => {
            let formattedResults = formattedWikiData(ans, searchValue)
            updateGCache(formattedResults)
            saveToStorage(G_CACHE_KEY, gCache)
            return Promise.resolve(formattedResults)
        })
        .catch(() => { console.log('problem loading wiki api') })

}

// LIST
// CREATE
// READ
function isWikiInCache(str) {
    if (!gCache.length) return false
    const parameter = 'searchTitle'
    const exist = gCache.some(item => item[parameter] === str)
    return exist
}

function getGCache() {
    return gCache
}

// UPDATE 
function formattedWikiData(data, searchValue) {
    if (!data.search) {
        alert('No info in wiki regarding your search')
        return
    }
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
