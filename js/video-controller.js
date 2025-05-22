'use strict';

// LIST

function renderVideos(str) {
    getVideos(str)
    .then(ans => {
            console.log("🚀 ~ renderVideos ~ ans:", ans)
            renderPreviewVideos(ans)
            renderVideoPlayer(ans[4].id)
        })
        .catch(err => console.log(err))
}

function renderPreviewVideos(ans) {
    var res = ans.map((video, idx) => {
        if (video.searchValue) {
        const strHTML = `
             <div class="video-card" id="video${idx}">
                <figure>
                    <img onload="onShowVideoCard(${idx})" class="video-img" src="${video.imgUrl}" alt="video image">
                </figure>
                <div class="video-info">
                  <h4 class="video-title">${video.videoTitle}</h4>  
                  <time data-time="${video.dateOfPublish}" class="video-publishTime">${video.dateOfPublish}</time>
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


// CREATE


// READ

function onSearchVideo() {

}

// UPDATE

function onShowVideoCard(idx) {
    document.querySelector('.video-list').hidden = false
}

function onShowVideo() {
    document.querySelector('.video-player').hidden = false
}

// DELETE


