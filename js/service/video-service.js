'use strict';

const YOUTUBE_KEY = 'AIzaSyAI1_lARUYgn0v1k21qP4EMYDRtlsgx_10'
const G_CACHE_KEY = 'gCacheDB'

var gCache = loadFromStorage(G_CACHE_KEY) || null
var gSearchValue = null

// LIST

function onAskVideos(str) {
    const searchValue = str || 'Music videos'
    gSearchValue = searchValue
    if (isVideoInCache(searchValue)) {
        console.log('from cache')
        return Promise.resolve(gCache)
    }

    const YOUTUBE_OPTIONS5_KEY = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_KEY}&q=${searchValue}&maxResults=5`
    return axios.get(YOUTUBE_OPTIONS5_KEY)
        .then(res => {
            console.log('from Ajax')
            return res.data.items
        })
        .then(ans => {
            let formattedResults  = formattedVideoData(ans, searchValue)
            updateGCache(formattedResults )
            saveToStorage(G_CACHE_KEY, gCache)
            renderSearchedForItems()
        })
        .catch(() => console.log('loading from the api failed.'))

}

function addVideoToCache(data) {
    const parameter = 'videoTitle'
    data.forEach(newItem => {
        const exist = gCache.some(item => item[parameter] === newItem[parameter])
        if (!exist) gCache.push(newItem)
    })
    return gCache
}

function publishTime(str) {
    const [year, month, day] = str.split('T')[0].split('-')
    return `${day}/${month}/${year}`
}

// READ

function isVideoInCache(searchValue) {
    if (!gCache) return false
    return gCache.some((item, idx) => item.searchValue === searchValue)
}

function getVideos(str) {
    if (!gCache || str) {
        return onAskVideos(str)
            .then(() => gCache)
    } else {
        console.log('from cache')
        return Promise.resolve(gCache)
    }
}

function getLastSearchValue() {
    if (!gSearchValue) gSearchValue = gCache[0].searchValue
    return gSearchValue
}

function getGCache() {
    return gCache
}
function getSearchedForItems() {
    if (!gCache || !gCache.length) return []
    const searchItems = []
    gCache.forEach(item => {
        if (item.searchValue !== undefined && !searchItems.includes(item.searchValue)) searchItems.push(item.searchValue)
    })
    return searchItems
}

// UPDATE
function updateGCache(data) {
    const parameter = data[0].searchTitle ? 'articleTitle' : 'videoTitle'
    if (!getGCache()) gCache = []
    data.forEach(newItem => {
        const exist = gCache.some(item => item[parameter] === newItem[parameter])
        if (!exist) gCache.push(newItem)
    })
    return gCache
}

function formattedVideoData(data, searchValue) {
    var formattedArray = data.map(item => {
        const { id, snippet } = item
        let videoId = id.videoId
        let imgUrl = snippet.thumbnails.medium.url
        let description = snippet.description
        let dateOfPublish = publishTime(snippet.publishTime)
        let videoTitle = snippet.title
        const formattedData = { searchValue, videoTitle, id: videoId, description, dateOfPublish, imgUrl }
        return formattedData
    })
    return formattedArray
}

// DELETE

function clearStorage() {
    localStorage.clear()
    gCache = []
    renderSearchedForItems()
}