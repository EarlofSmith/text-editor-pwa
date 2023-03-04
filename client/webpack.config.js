const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // add webpack html plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

      new InjectManifest({
          swSrc: './src-sw.js',
          swDest: 'src-sw.js',
      }),

      // https://www.npmjs.com/package/webpack-pwa-manifest
      // manifest json file is created here
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Text editor that can be used offline',
        background_color: 'black',
        crossorigin: null,
        start_url:'/',
        publicPath: '/',
        fingerprints: false,
        icons: [
          {
            // takes the image and resizes it to designated sizes
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          },
        ]
      })
    ],

    module: {
      rules: [
        // css loader
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // babel loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        }
        
      ],
    },
  };
};
