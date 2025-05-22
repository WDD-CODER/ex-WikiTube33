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

// CREATE


// READ

function onSearchVideo() {

}

// UPDATE

// DELETE


