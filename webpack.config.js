const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.resolve(path.join(process.cwd(), 'src'));
const EXAMPLE_DIR = path.resolve(path.join(process.cwd(), 'example'));
const BUILD_DIR = path.resolve(path.join(process.cwd(), 'build'));

module.exports = {
  entry: {
    lib: path.join(SRC_DIR, 'index.ts'),
    example: { import: path.join(EXAMPLE_DIR, 'index.js'), dependOn: 'lib' },
  },
  output: {
    path: BUILD_DIR,
    publicPath: '',
    filename: '[name].build.js',
  },

  // don't forget about dots...
  resolve: {
    extensions: ['.ts', '.js', '.html', '.css'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(EXAMPLE_DIR, 'index.pug'),
      favicon: path.join(EXAMPLE_DIR, 'favicon.png'),
      filename: 'index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader'],
      },
    ],
  },

  mode: 'development',
  devtool: 'eval-cheap-module-source-map',

  devServer: {
    contentBase: BUILD_DIR,
    compress: true,

    host: '0.0.0.0',
    port: 8080,

    inline: true,
    hot: true,

    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  },
};