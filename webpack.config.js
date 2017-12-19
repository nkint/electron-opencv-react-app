const buildWebpackConfig = require('webpack-preset-accurapp')

module.exports = buildWebpackConfig({
  target: 'electron-renderer',
})
