export function initClickCollect() {
  window.onload = function () {
    console.log('click collector loaded')
    document.body.addEventListener('click', function(e) {
      // 1. Store pure click event
      // console.log(e)
      // 2. Store document ?
      var el = e.target
      var path = []
      var pathId = ""
      while ( el.parentNode != null ) {
        var sibCount = 0;
        var sibIndex = 0;
        var attributes = {}
        for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
          var sib = el.parentNode.childNodes[i];
          if ( sib.nodeName == el.nodeName ) {
            if ( sib === el ) {
              sibIndex = sibCount;
            }
            sibCount++;
          }
        }
        attributes = { nodeName: el.nodeName, className: el.className, id: el.id, index: sibIndex, text: el.innerText }
        path.unshift(attributes)
        pathId = String(sibIndex) + pathId
        el = el.parentNode;
      }
      var click = { element: path[path.length -1], path: path, pathId: pathId}
      upload(click)
    })
  }
}

export function upload(payload, path='click') {
  payload.clientTime = new Date()
  debugger;
  var endpoint = `http://104.199.214.125:3001/${path}`
  var request = new XMLHttpRequest();
  request.open('POST', endpoint , true)
  request.withCredentials = true
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
  request.send(JSON.stringify(payload))
}
