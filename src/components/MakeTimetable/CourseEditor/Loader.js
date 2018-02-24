export default () => new Promise((resolve) => {
  require.ensure([], () => {
    resolve({
      CourseEditor: import('./index'),
    });
  });
});
