/* eslint no-useless-escape: 0 */
/* eslint no-nested-ternary: 0 */


(function (win, lib) {
  let timer = 0;
  const doc = win.document;
  const docEl = doc.documentElement;
  let viewportEl = doc.querySelector('meta[name="viewport"]');
  const flexibleEl = doc.querySelector('meta[name="flexible"]');
  let dataDpr = 0;
  let initScale = 0;
  const flexible = lib.flexible || (lib.flexible = {});

  // 修改html的属性
  const setHtmlAttribute = () => {
    let width = docEl.getBoundingClientRect().width;
    if (width / dataDpr > 540) {
      width = 540 * dataDpr;
    }
    const remUnit = width / 10;
    docEl.style.fontSize = `${remUnit}px`;
    flexible.rem = win.rem = remUnit;
  };

  if (viewportEl) {
    // 如果有viewport
    console.warn('将根据已有的meta标签来设置缩放比例');
    const scale = viewportEl.getAttribute('content').match(/initial-scale=([\d\.]+)/);
    if (scale) {
      initScale = parseFloat(scale[1]);
      dataDpr = parseInt(1 / initScale, 10);
    }
  } else if (flexibleEl) {
    // 如果有flexible
    const attrContent = flexibleEl.getAttribute('content');
    if (attrContent) {
      const initDpr = attrContent.match(/initial\-dpr=([\d\.]+)/);
      const maxDpr = attrContent.match(/maximum\-dpr=([\d\.]+)/);
      if (initDpr) {
        dataDpr = parseFloat(initDpr[1]);
        initScale = parseFloat((1 / dataDpr).toFixed(2));
      }
      if (maxDpr) {
        dataDpr = parseFloat(maxDpr[1]);
        initScale = parseFloat((1 / dataDpr).toFixed(2));
      }
    }
  }

  if (!initScale && !dataDpr) {
    const ua = win.navigator.userAgent;
    const isMobi = !!ua.match(/android/gi) || !!ua.match(/iphone/gi);
    const isIos93 = isMobi && !!ua.match(/OS 9_3/);
    const dpr = win.devicePixelRatio;
    // ios 9.3 强制dpr=1
    if (isMobi && !isIos93) {
      if (dpr >= 3 && (!dataDpr || dataDpr >= 3)) {
        dataDpr = 3;
      } else if (dpr >= 2 && (!dataDpr || dataDpr >= 2)) {
        dataDpr = 2;
      } else {
        dataDpr = 1;
      }
    } else {
      dataDpr = 1;
    }
    initScale = 1 / dataDpr;
  }

  if (docEl.setAttribute('data-dpr', dataDpr) || !viewportEl) {
    viewportEl = doc.createElement('meta');
    if (viewportEl.setAttribute('name', 'viewport')
    || viewportEl.setAttribute('content',
    `initial-scale=${initScale}, maximum-scale=${initScale}, minimum-sacle=${initScale}, user-scalable=no`)
    || docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(viewportEl);
    } else {
      const tmpDiv = doc.createElement('div');
      tmpDiv.appendChild(viewportEl);
      doc.write(tmpDiv.innerHTML);
    }
  }

  win.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(setHtmlAttribute, 300);
  }, false);

  win.addEventListener('pageshow', e => {
    if (e.persisted) {
      clearTimeout(timer);
      timer = setTimeout(setHtmlAttribute, 300);
    }
  }, false);


  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = `${12 * dataDpr}px`;
  } else {
    doc.addEventListener('DOMContentLoaded', () => {
      doc.body.style.fontSize = `${12 * dataDpr}px`;
    }, false);
  }
  setHtmlAttribute();
  flexible.dpr = win.dpr = dataDpr;
  flexible.refreshRem = setHtmlAttribute;
  flexible.rem2px = function (rem) {
    const res = parseFloat(rem) * this.rem;
    return typeof rem === 'string' && rem.match(/rem$/) ? `${res}px` : res;
  };
  flexible.px2rem = function (px) {
    const res = parseFloat(px) / this.rem;
    return typeof px === 'string' && px.match(/px$/) ? `${res}rem` : res;
  };
}(window, window.lib || (window.lib = {})));
