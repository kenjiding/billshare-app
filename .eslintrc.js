// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  env: {
    node: true
  },
  globals: {
    __dirname: 'readonly'
  },
  rules: {
    quotes: ['error', 'single'],
    'max-len': ['error', { code: 120 }]
  }
};
