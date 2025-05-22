'use strict';

// LIST
function onRenderWiki(str) {
    getWikipediaQuery(str)
    .then(renderWikiArticle)
    // .then(ans => renderWikiArticle(ans))
}


function renderWikiArticle(ans) {
    var strMainHTML = []
    ans.forEach((article, idx) => {
        if (article.articleTitle && article.searchTitle === getGVideo() ) {
            let strHTML = `
            <div class="wiki-article" id="article${idx}">
            <h4 class="article-title">${article.articleTitle}</h4>  
            <p class="article-text">${article.text}</p>
            </div>
            `
            strMainHTML.push(strHTML)
        }
    })
    
    document.querySelector('.wiki-info').innerHTML = strMainHTML.join('')
}


// CREATE

// READ


// UPDATE

// DELETE


