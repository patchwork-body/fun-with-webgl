const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.resolve(path.join(process.cwd(), 'src'));
const EXAMPLE_DIR = path.resolve(path.join(process.cwd(), 'example'));
const BUILD_DIR = path.resolve(path.join(process.cwd(), 'build'));

module.exports = {
  entry: {
    lib: path.join(SRC_DIR, 'index.ts'),
    pointClicker: {
      import: path.join(EXAMPLE_DIR, 'point_clicker', 'index.ts'),
      dependOn: 'lib',
    },
    triangles: {
      import: path.join(EXAMPLE_DIR, 'triangles', 'index.ts'),
      dependOn: 'lib',
    },
    rectangle: {
      import: path.join(EXAMPLE_DIR, 'rectangle', 'index.ts'),
      dependOn: 'lib',
    },
    examples: {
      import: path.join(EXAMPLE_DIR, 'index.ts'),
      dependOn: ['lib', 'pointClicker', 'triangles', 'rectangle'],
    },
  },
  output: {
    path: BUILD_DIR,
    publicPath: '',
    filename: '[name].build.js',
  },

  // don't forget about dots...
  resolve: {
    extensions: ['.ts', '.js', '.html', '.css', '.vs', '.fs'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(EXAMPLE_DIR, 'style.css'),
          to: BUILD_DIR,
          flatten: true,
        },
        {
          from: path.join(EXAMPLE_DIR, 'static'),
          to: BUILD_DIR,
          flatten: true,
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(EXAMPLE_DIR, 'index.pug'),
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(EXAMPLE_DIR, 'point_clicker', 'index.pug'),
      filename: 'point_clicker.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(EXAMPLE_DIR, 'triangles', 'index.pug'),
      filename: 'triangles.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(EXAMPLE_DIR, 'rectangle', 'index.pug'),
      filename: 'rectangle.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(vs|fs)$/,
        loader: 'shader-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
    ],
  },

  mode: 'development',
  devtool: 'eval-cheap-module-source-map',

  devServer: {
    contentBase: BUILD_DIR,
    publicPath: '',
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
