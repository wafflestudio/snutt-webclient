// From server code
export function timeJsonToMask(timeJson) {
  var i,j;
  var bitTable2D = [];
  for (i = 0; i < 7; i++)
    bitTable2D.push([...new Array(30).keys()].map(v => 0))

  timeJson.forEach(function(lecture, lectureIdx) {
    var dayIdx = lecture.day;
    for (var i = lecture.start * 2; i < (lecture.start + lecture.len)*2; i++)
      bitTable2D[dayIdx][i] = 1;
  });

  var timeMasks = [];
  for (i = 0; i < 7; i++) {
    var mask = 0;
    for (j = 0; j < 30; j++) {
      mask = mask << 1;
      if (bitTable2D[i][j] === 1)
        mask = mask + 1;
    }
    timeMasks.push(mask);
  }
  return timeMasks;
}

export function contrast({r, g, b}) {
  let red = r / 255 * 0.2126
  let green = g / 255  * 0.7152
  let blue = b / 255 * 0.0722
  let luminance = red + green + blue

  // Light: 'hsb(0, 0, 15)' -> rgb(38, 38, 38)
  // Dark: 'hsb(192, 2, 95)' ->rgb(237, 241, 242)

  if (luminance > 0.6)
    return "rgb(38, 38, 38)"
  else
    return "rgb(237, 241, 242)"
}
