const populateColor = (colorScheme, lectures) => {
  return lectures.map(lecture => {
    const result = {
      ...lecture
    }
    if (lecture.colorIndex && lecture.colorIndex <= colorScheme.length) {
      result.color = colorScheme[lecture.colorIndex - 1];
    }
    return result;
  });
};

export default populateColor;
