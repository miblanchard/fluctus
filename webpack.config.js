const webpack = require('webpack');

module.exports = [
  {
    name: 'fluctus react version',
    devtool: 'source-map', // or use source-map-eval
    entry: `${__dirname}/client/index.jsx`,
    output: {
      path: `${__dirname}/client/`,
      filename: 'bundle.js',
    },
    watch: true,
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
        },
      ],
    },
    plugins: [
      new webpack.BannerPlugin('Copyright Imperiojs'),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
    ],
  // IF WE WANT TO USE THE WEBPACK SERVER - NOT USING FOR NOW SINCE WE HAVE OUR OWN SERVER.
    // devServer: {
    //   contentBase: './library/client/mainClient.js',
    //   colors: true,
    //   historyApiFallback: true,
    //   inline: true,
    //   hot: true,
    // },
  },
];
