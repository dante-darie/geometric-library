export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['fix', 'feat', 'chore']],
    'subject-case': [0, 'always', 'sentence-case']
  },
  ignores: [(message) => message.includes('[skip ci]')]
};
