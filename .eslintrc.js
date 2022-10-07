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
      },
      env: {
        browser: true
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
      },
      env: {
        browser: true
      }
    }
  ]
}
