'use strict';

const YOUTUBE_KEY = 'AIzaSyAI1_lARUYgn0v1k21qP4EMYDRtlsgx_10'
const G_CACHE_KEY = 'gCacheDB'

var gCache = loadFromStorage(G_CACHE_KEY) || null
var gVideo = null

// LIST

function onAskVideos(str) {
    const searchValue = str || 'Music videos'
    gVideo = searchValue
    if (isVideoInCache(searchValue)) {
        console.log('from cache')
        // return gCache
        return Promise.resolve(gCache)
    }

    const YOUTUBE_OPTIONS5_KEY = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_KEY}&q=${searchValue}`
    return axios.get(YOUTUBE_OPTIONS5_KEY)
        .then(res => {
            console.log('from Ajax')
            return res.data.items
        })
        .then(ans => {
            let formattedAns = formattedVideoData(ans, searchValue)
            updateGCache(formattedAns)
            saveToStorage(G_CACHE_KEY, gCache)
        })
        .catch(() => console.log('loading from the api failed.'))

}

// CREATE
// READ
// UPDATE
// DELETE
