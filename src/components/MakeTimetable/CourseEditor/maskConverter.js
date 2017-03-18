// From server code
export default function timeJsonToMask(timeJson) {
  var i,j;
  var bitTable2D = [];
  for (i = 0; i < 7; i++)
    bitTable2D.push([...new Array(32).keys()].map(v => 0))

  timeJson.forEach(function(lecture, lectureIdx) {
    var dayIdx = lecture.day;
    for (var i = lecture.start * 2; i < (lecture.start + lecture.len)*2; i++)
      bitTable2D[dayIdx][i] = 1;
  });

  var timeMasks = [];
  for (i = 0; i < 7; i++) {
    var mask = 0;
    for (j = 0; j < 32; j++) {
      mask = mask << 1;
      if (bitTable2D[i][j] === 1)
        mask = mask + 1;
    }
    timeMasks.push(mask);
  }
  return timeMasks;
}
