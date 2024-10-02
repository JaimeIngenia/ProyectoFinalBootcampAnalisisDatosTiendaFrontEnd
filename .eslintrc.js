const fs = require('fs');
const path = require('path');

// Leer configuración de Prettier desde el archivo .prettierrc
const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: [
    'react-app', // Reglas recomendadas para React (si estás usando Create React App)
    'plugin:react/recommended', // Reglas adicionales para React
    'prettier', // Desactiva las reglas de ESLint que podrían entrar en conflicto con Prettier
  ],
  plugins: ['prettier'], // Activa Prettier como plugin
  rules: {
    'prettier/prettier': ['error', prettierOptions], // Aplica las reglas de Prettier como errores
    'react/react-in-jsx-scope': 'off', // Desactiva la advertencia de React en el scope
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'], // Configuración específica para TypeScript
      rules: { 'prettier/prettier': ['warn', prettierOptions] }, // Solo advertencias para TypeScript
    },
  ],
  settings: {
    react: {
      version: 'detect', // Detecta automáticamente la versión de React
    },
  },
};
