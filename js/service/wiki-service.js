'use strict';
// const G_CACHE_KEY = 'gCacheDB'
const WIKI_CACHE_KEY = 'wikiCacheDB'
var gWikiArticles = loadFromStorage(WIKI_CACHE_KEY) || []

function getWikipediaQuery(text) {
    const searchValue = text || getLastSearchValue()
    const WikipediaUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${searchValue}&srlimit=5&format=json`
    if (isWikiInCache(searchValue)) {
        console.log('from cache')
        return Promise.resolve(gWikiArticles)
    }

    return axios.get(WikipediaUrl)
        .then(res => {
            console.log('from Ajax')
            return res.data.query
        })
        .then(ans => {
            let formattedResults = formattedWikiData(ans, searchValue)
            updateWikiCache(formattedResults)
            saveToStorage(WIKI_CACHE_KEY, gWikiArticles)
            return Promise.resolve(gWikiArticles)
        })
        .catch(() => { console.log('problem loading wiki api') })

}

// LIST
// CREATE
// READ
function isWikiInCache(text) {
    if (!gWikiArticles.length) return false
    const exist = gWikiArticles.some(item => item.searchTitle === text)
    return exist
}

function getGWikiArticles() {
    return gWikiArticles
}

// UPDATE 
function updateWikiCache(data) {
    // const parameter = data[0].searchTitle ? 'articleTitle' : 'videoTitle'
    if (!gWikiArticles) gWikiArticles = []
    data.forEach(newItem => {
        const exist = gWikiArticles.some(item => item.articleTitle === newItem.articleTitle)
        if (!exist) gWikiArticles.push(newItem)
    })
    return gCache
}


function formattedWikiData(data, searchValue) {
    if (!data.search) {
        alert('No info in wiki regarding your search')
        return
    }
    var formattedArray = data.search.map(item => {
        const { title, snippet } = item
        let text = snippet
        let articleTitle = title
        const formattedData = { searchValue, articleTitle, text }
        return formattedData
    })
    return formattedArray
}


// DELETE
