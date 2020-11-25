const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: ['loadsh', 'validator'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'symle',
    libraryTarget: 'umd'
  }
} 