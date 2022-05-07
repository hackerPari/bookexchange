import $ from 'jquery';
import Cookies from 'js-cookie';
import KatexRender from 'katex/dist/contrib/auto-render';

export function processKatex(html) {
    let dom = $("<div></div>");
    dom.html(html);
    KatexRender(dom[0], {
        delimiters: [
          { left: '$', right: '$', display: false }
        ]
      });
    return dom[0].innerHTML;  
}

export function getShuffledIndexesMap(length) {
  /**
   * returns a map of shuffled indexes for array of size 'length'
   */
  let shuffledIndexesMap = [];
  for (let i = 0; i < length; i++) {
    shuffledIndexesMap[i] = i;
  }
  for (let i = length - 1; i > 0; i--) {
    let j = parseInt(Math.random() * 10) % (i + 1);
    let temp = shuffledIndexesMap[i]
    shuffledIndexesMap[i] = shuffledIndexesMap[j];
    shuffledIndexesMap[j] = temp;
  }

  return shuffledIndexesMap;
}

export function YouTubeThumbnailUrlBuilder(url) {
  let videoId = getYoutubeVideoIdFromUrl(url);
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYoutubeEmbedUrl(url) {
  let videoId = getYoutubeVideoIdFromUrl(url);
  return `https://www.youtube.com/embed/${videoId}`;
}

export function getYoutubeVideoIdFromUrl(url) {
  let videoId = url.split('/').slice(-1)[0],
    isEmbedUrl = url.indexOf('embed') !== -1;

  if (isEmbedUrl) {
    let queryParamStartIndex = videoId.indexOf('?');
    if (queryParamStartIndex != -1) {
        videoId = videoId.substring(0, queryParamStartIndex);
    }  
  } else {
      let queryParamStartIndex = videoId.indexOf('v=')
      if (queryParamStartIndex !== -1) {
          let nextQueryParamStartIndex = videoId.substring(queryParamStartIndex).indexOf('&');
          if (nextQueryParamStartIndex != -1) {
              videoId = videoId.substring(queryParamStartIndex + 2, queryParamStartIndex + nextQueryParamStartIndex);
          } else {
              videoId = videoId.substring(queryParamStartIndex + 2);
          }  
      }  
  }  

  return videoId;
}

export function isLoggedIn() {
  return Cookies.get('token') ? true : false;
}
