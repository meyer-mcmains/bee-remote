module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          alias: {
            '@components': './src/components',
            '@modules': './src/modules',
            '@screens': './src/screens',
            '@types': './src/types.js'
          },
          root: ['./']
        }
      ]
    ],
    presets: ['babel-preset-expo']
  };
};
