module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'codeceptjs/codeceptjs': true
  },
  extends: [
    'standard',
    'plugin:codeceptjs/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
  }
}
