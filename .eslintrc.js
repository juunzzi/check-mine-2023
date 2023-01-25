module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['react-app', 'react-app/jest', 'airbnb', 'prettier'],
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'max-depth': ['error', 2],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
};
