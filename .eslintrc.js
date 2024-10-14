module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // Para TypeScript
    'prettier', // Integração com Prettier
    'plugin:prettier/recommended', // Mostra erros do Prettier como erros do ESLint
  ],
  parser: '@typescript-eslint/parser', // Usado para fazer o parsing de código TypeScript
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Habilita suporte ao JSX
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint', // Para TypeScript
    'prettier', // Prettier plugin
  ],
  rules: {
    // Suas configurações de regras
    'prettier/prettier': ['off', {}, { usePrettierrc: true }], // Aplica as regras do prettier <==
    'react/react-in-jsx-scope': 'off', // Não é necessário importar React no escopo no React 17+
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignora variáveis iniciadas com _
    'react/prop-types': 'off', // Desativa verificação de prop-types, já que TypeScript cuida disso
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Não força a tipagem de funções exportadas
  },
  settings: {
    react: {
      version: 'detect', // Detecta automaticamente a versão do React
    },
  },
};
