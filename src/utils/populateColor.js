const populateColor = (colorScheme, lectures) => {
  return lectures.map(lecture => {
    if (lecture.colorIndex && lecture.colorIndex <= colorScheme.length) {
      lecture.color = colorScheme[lecture.colorIndex - 1];
    }
    return lecture;
  });
};

export default populateColor;
