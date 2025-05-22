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


// CREATE


// READ

function onSearchVideo() {

}

// UPDATE

// DELETE


