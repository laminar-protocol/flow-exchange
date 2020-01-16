const path = require('path');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ['sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
