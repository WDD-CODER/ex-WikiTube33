'use strict';

// LIST
// CREATE
function updateGCache(data) {
    const parameter = data[0].searchTitle ? 'articleTitle' : 'videoTitle'
    if (!getGCache()) gCache = []
    data.forEach(newItem => {
        const exist = gCache.some(item => item[parameter] === newItem[parameter])
        if (!exist) gCache.push(newItem)
    })
    return gCache
}

// READ
// UPDATE
// DELETE
