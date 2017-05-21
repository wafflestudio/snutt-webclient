export function initClickCollect() {
  window.onload = function () {
    console.log('click collector loaded');
    document.body.addEventListener('click', (e) => {
      // 1. Store pure click event
      // console.log(e)
      // 2. Store document ?
      let el = e.target;
      const path = [];
      let pathId = '';
      while (el.parentNode != null) {
        let sibCount = 0;
        let sibIndex = 0;
        let attributes = {};
        for (let i = 0; i < el.parentNode.childNodes.length; i++) {
          const sib = el.parentNode.childNodes[i];
          if (sib.nodeName == el.nodeName) {
            if (sib === el) {
              sibIndex = sibCount;
            }
            sibCount++;
          }
        }
        attributes = { nodeName: el.nodeName, className: el.className, id: el.id, index: sibIndex, text: el.innerText };
        path.unshift(attributes);
        pathId = String(sibIndex) + pathId;
        el = el.parentNode;
      }
      const click = { element: path[path.length - 1], path, pathId };
      upload(click);
    });
  };
}

export function upload(payload, path = 'click') {
  payload.clientTime = new Date();
  debugger;
  const endpoint = `http://104.199.214.125:3001/${path}`;
  const request = new XMLHttpRequest();
  request.open('POST', endpoint, true);
  request.withCredentials = true;
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify(payload));
}
