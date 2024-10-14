module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Usa babel-jest para transformar os arquivos
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
