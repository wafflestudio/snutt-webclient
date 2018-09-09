const fs = require('fs');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelSettings = JSON.parse(fs.readFileSync('.babelrc'));

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.js',
    vendor: ['react', 'react-dom', 'redux', 'immutable'],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist/static'),
    publicPath: 'static/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      minify: true,
      template: path.resolve(__dirname, 'src/index.html'),
      filename: path.resolve(__dirname, 'dist/index.html'),
    }),
    new Dotenv({
      path: process.env.NODE_ENV === 'production' ? './.env.prod' : './.env.dev',
      systemvars: true,
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
        oneOf: [
          {
            resourceQuery: /inline/,
            use: {
              loader: 'url-loader',
              options: {},
            },
          },
          {
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
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
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
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  );
} else {
  console.log('dev');
  config.devtool = '#cheap-module-source-map';
  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    publicPath: '/static/',
    historyApiFallback: true,
    port: 3000,
  };
  config.plugins.push(new webpack.NamedModulesPlugin());
}

module.exports = config;
