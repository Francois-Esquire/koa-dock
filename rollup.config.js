import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const external = Object.keys(pkg.dependencies).concat(Object.keys(pkg.devDependencies)).concat('react-dom/server');
const extensions = ['.js', '.jsx'];

const watch = {
  chokidar: true,
  include: 'src/**',
  exclude: 'node_modules/**',
};

const server = {
  external,
  watch,
  input: 'src/server/app.js',
  output: {
    interop: false,
    file: 'dist/app.js',
    format: 'cjs',
  },
  plugins: [
    buble({
      transform: {
        letConst: false,
        arrow: false,
        classes: false,
        modules: false,
        destructuring: false,
        parameterDestructuring: false,
        defaultParameter: false,
        conciseMethodProperty: false,
        templateString: false,
      },
    }),
  ],
};

const www = {
  external,
  watch,
  input: 'src/www/index.jsx',
  output: {
    file: 'dist/www.js',
    format: 'cjs',
  },
  plugins: [
    resolve({
      extensions,
      // jail: '/src',
      modulesOnly: true,
    }),
    buble({
      transforms: {
        letConst: false,
        arrow: false,
        classes: false,
        modules: false,
        destructuring: false,
        parameterDestructuring: false,
        defaultParameter: false,
        conciseMethodProperty: false,
        templateString: false,
      },
      objectAssign: 'Object.assign',
      jsx: 'React.createElement',
    }),
  ],
};

module.exports = [
  server,
  www,
];
