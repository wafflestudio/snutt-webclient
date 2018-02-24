const fs = require('fs');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const babelSettings = JSON.parse(fs.readFileSync('.babelrc'));

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.js',
  },
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/static'),
    publicPath: 'static/',
  },
  plugins: [
    new Dotenv({
      path: (process.env.NODE_ENV === 'production') ? './.env.prod' : './.env.dev',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: babelSettings,
        },
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, 'assets'),
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
              es5: true,
              svgo: {
                // svgo options
                plugins: [{ removeTitle: false }],
                floatPrecision: 2,
              },
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
      {

      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  console.log('prod');
  config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
        },
      }),
  );
} else {
  console.log('dev');
  config.devtool = '#cheap-module-source-map';
  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    publicPath: '/static/',
    port: 3000,
  };
  config.plugins.push(
    new webpack.NamedModulesPlugin(),
  );
}

module.exports = config;
