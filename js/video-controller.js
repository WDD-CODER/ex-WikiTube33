'use strict';
const defaultSearchValue = 'Cooking in vacuum'
// LIST

function onInit() {
    ApplyFirstSearch()
    // renderVideos()
    // onRenderWiki()
}

function ApplyFirstSearch() {
    document.querySelector('#searchBar').value = defaultSearchValue
    renderVideos(defaultSearchValue)
    renderSearchedForItems()
}


function renderVideos(str) {
    getVideos(str)
        .then(ans => {
            renderPreviewVideos(ans)
            renderVideoPlayer(ans[4].id)
            onRenderWiki(str)
        })
        .catch(err => console.log(err))
}

function renderPreviewVideos(ans) {
    var res = getGCache().map((video, idx) => {
        if (video.searchValue && video.searchValue === getGVideo()) {
            const strHTML = `
             <div class="video-card" id="video${idx}">
                <figure>
                    <img onload="onShowVideoCard(${idx})" class="video-img" src="${video.imgUrl}" alt="video image">
                </figure>
                <div class="video-info">
                  <h4 class="video-title">${video.videoTitle}</h4>  
                  <time data-time="${video.dateOfPublish}" class="video-publishTime">Release date :${video.dateOfPublish}</time>
                  </div>
                  <p class="description">${video.description}</p>
            </div>
 `
            return strHTML
        }
    })
    document.querySelector('.video-list').innerHTML = res.join('')
}

//לא מבין למה זה עובד רק עם הקישור הקבוע שקבלתי באינטרנט ולא עם התעודת זהות

function renderVideoPlayer() {
    const id = 'tgbNymZ7vqY'
    const videoUrl = `https://www.youtube.com/embed/${id}`
    let elIframe = document.querySelector('.video-player')
    elIframe.onload = onShowVideo()
    elIframe.src = videoUrl
}
function renderSearchedForItems() {
    let elSpan = document.querySelector('.searched-for')
    const searchedItems = getSearchedForItems()
    if (!searchedItems.length) return elSpan.innerText = ''
    var res = getSearchedForItems().map(item => ' ' + item)
    elSpan.innerText = res
}


// CREATE


// READ
function onShowModal() {
    document.querySelector('.clear-storage-modal').showModal()
}

function onCloseModal(ev) {
    document.querySelector('.clear-storage-modal').close()
}
function onSearchVideo(ev) {
    ev.preventDefault()
    var str = document.querySelector('#searchBar').value
    renderVideos(str)
}

// UPDATE

function onShowVideoCard(idx) {
    document.querySelector('.video-list').hidden = false
}

function onShowVideo() {
    document.querySelector('.video-player').hidden = false
}

// DELETE
function onClearStorage() {
    clearStorage()
}

