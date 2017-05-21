require('babel-polyfill');

export default () => new Promise((resolve) => {
  require.ensure([], () => {
    resolve({
      CourseEditor: require('./index'),
    });
  });
});
