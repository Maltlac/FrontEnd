module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',  // Transpile les fichiers JavaScript et JSX avec Babel
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)',  // Ne pas ignorer axios dans node_modules
  ],
  moduleFileExtensions: ['js', 'jsx'],  // Gérer les extensions JS et JSX
  testEnvironment: 'jsdom',  // Utilisé pour les tests React
};
