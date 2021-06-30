/* eslint-disable prefer-regex-literals */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default
const ImageminMozjpeg = require('imagemin-mozjpeg')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/images/icon192.png'),
          to: path.resolve(__dirname, 'dist/images')
        }
      ]
    }),
    new ImageminWebpackPlugin({
      disable: process.env.NODE_ENV !== 'production',
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true
        })
      ]
    }),
    new WebpackPwaManifest({
      name: 'Restaurant Apps',
      short_name: 'Restaurant App Lite',
      description: 'Explore a thausand of restaurant information served',
      background_color: '#ffffff',
      start_url: '/index.html',
      display: 'standalone',
      theme_color: '#ffffff',
      icons: [
        {
          src: path.resolve('src/public/icons/icon512.png'),
          sizes: [48, 72, 96, 144, 192, 512],
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp(
            'https://restaurant-api.dicoding.dev/'
          ),
          handler: 'StaleWhileRevalidate'
        },
        {
          urlPattern: new RegExp(
            'https://use.fontawesome.com/'
          ),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'fontawesome'
          }
        },
        {
          urlPattern: new RegExp(
            'https://fonts.googleapis.com/'
          ),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'font'
          }
        }
      ],
      ignoreURLParametersMatching: [/.*/]
    })
  ]
}
