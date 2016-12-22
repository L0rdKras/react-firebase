module.exports = {
  entry: {
    app: './src/index.jsx'
  },
  output: {
    path: './build',
    filename: 'app.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    inline: true
  },
  module: {
    loaders: [
      { test: /(\.js|.jsx)$/, exclude: /node_modules/, loaders: ['babel'] }
    ]
  }
}
