require('babel-polyfill')

export default () => {
  return new Promise(resolve => {
    require.ensure([], () => {
      resolve({
        CourseEditor: require('./index'),
      })
    })
  })
}
