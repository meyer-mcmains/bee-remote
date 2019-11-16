module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          alias: {
            '@components': './src/components',
            '@hooks': './src/hooks/index.js',
            '@mbApi': './src/mbApi',
            '@modules': './src/modules',
            '@screens': './src/screens',
            '@types': './src/types.js',
            '@utils': './src/utils'
          },
          root: ['./']
        }
      ]
    ],
    presets: ['babel-preset-expo']
  };
};
