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

export function isLoggedIn() {
  return Cookies.get('token') ? true : false;
}
