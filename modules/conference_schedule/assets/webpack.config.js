module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  externals: {
    jquery: 'jQuery',
    drupal: 'Drupal',
    drupalSettings: 'drupalSettings',
  },
};
