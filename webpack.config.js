const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts/, // tsx only necessary for react projects
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'array.visualize.js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: "array.visualize.js.map"
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: [path.join(__dirname, 'examples', 'basic'), path.join(__dirname, 'dist'),  path.join(__dirname, 'node_modules')],
    port: 7777,
  },
};