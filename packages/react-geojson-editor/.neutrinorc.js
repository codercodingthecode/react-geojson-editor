const Dotenv = require('dotenv-webpack');
// 'react/jsx-closing-tag-location': 'off'
module.exports = {
  use: [
    ['@neutrinojs/airbnb', {
      eslint: {
        globals: ['google'],
        rules: {
          'function-paren-newline': ['error', 'consistent'],
          'comma-dangle': ['error', {
            'arrays': 'only-multiline',
            'objects': 'only-multiline',
            'imports': 'only-multiline',
            'exports': 'only-multiline',
            'functions': 'only-multiline'
          }]
        }
      }
    }],
    '@neutrinojs/react-components',
    ['@neutrinojs/jest', { setupFiles: ['<rootDir>/test/helpers/setup.js'] }],
    (neutrino) => {
      neutrino.config.module
        .rule('add-css-to-jsx')
        .test(/\.scss$/)
        .use('add-css-to-jsx-3')
        .loader('style-loader')
        .end()
        .use('add-css-to-jsx-2')
        .loader('css-loader')
        .options({
          importLoaders: 1,
          modules: true,
          camelCase: true,
          localIdentName: 'rge__[name]__[local]___[hash:base64:5]',
        })
        .end()
        .use('add-css-to-jsx-1')
        .loader('sass-loader')
    },

    neutrino => {
      if (process.env.NODE_ENV !== 'production')
        neutrino.config.plugin('dot-env').use(Dotenv);
    }
  ]
};
