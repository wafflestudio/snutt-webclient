// From server code
export default function timeJsonToMask(timeJson) {
  let i,
    j;
  const bitTable2D = [];
  for (i = 0; i < 7; i++) { bitTable2D.push([...new Array(30).keys()].map(v => 0)); }

  timeJson.forEach((lecture, lectureIdx) => {
    const dayIdx = lecture.day;
    for (let i = lecture.start * 2; i < (lecture.start + lecture.len) * 2; i++) { bitTable2D[dayIdx][i] = 1; }
  });

  const timeMasks = [];
  for (i = 0; i < 7; i++) {
    let mask = 0;
    for (j = 0; j < 30; j++) {
      mask <<= 1;
      if (bitTable2D[i][j] === 1) { mask += 1; }
    }
    timeMasks.push(mask);
  }
  return timeMasks;
}
