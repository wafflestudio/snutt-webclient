module.exports = function (year, semester, course_number, lecture_number) {
  console.log(arguments);
  let openShtmFg = null,
    openDetaShtmFg = null;
  if (semester == '1') {
    openShtmFg = 'U000200001';
    openDetaShtmFg = 'U000300001';
  } else if (semester == '2') {
    openShtmFg = 'U000200002';
    openDetaShtmFg = 'U000300001';
  } else if (semester == 'S') {
    openShtmFg = 'U000200001';
    openDetaShtmFg = 'U000300002';
  } else if (semester == 'W') {
    openShtmFg = 'U000200002';
    openDetaShtmFg = 'U000300002';
  }

  const url = `http://sugang.snu.ac.kr/sugang/cc/cc103.action?openSchyy=${year}&openShtmFg=${openShtmFg}&openDetaShtmFg=${openDetaShtmFg}&sbjtCd=${course_number}&ltNo=${lecture_number}&sbjtSubhCd=000`;

  window.open(url);
};
