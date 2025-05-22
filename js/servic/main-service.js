'use strict';

// LIST
// CREATE
function updateGCache(data) {
    console.log("🚀 ~ updateGCache ~ data:", data)
    const parameter = data[0].searchTitle ? 'articleTitle' : 'videoTitle'
    if (!getGCache()) gCache = []
    data.forEach(newItem => {
        const exist = gCache.some(item => item[parameter] === newItem[parameter])
        if (!exist) gCache.push(newItem)
    })
    console.log("🚀 ~ updateGCache ~ gCache:", gCache)
    return gCache
}

// READ
// UPDATE
// DELETE
