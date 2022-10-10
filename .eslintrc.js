module.exports = {
  overrides: [
    {
      files: [
        '*.js',
        '*.ts'
      ],
      excludedFiles: [
        'dist/**/*.js'
      ],
      extends: [
        '@munierujp/eslint-config-typescript',
        'plugin:jest/recommended'
      ],
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    {
      files: [
        'dist/**/*.js'
      ],
      extends: [
        'plugin:userscripts/recommended'
      ],
      parserOptions: {
        ecmaVersion: 'latest'
      }
    }
  ]
}
