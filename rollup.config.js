import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const { module: MODULE_DEST_FILE, dependencies } = require('./package.json');

export default {
  input: './index.js',
  output: [
    {
      file: MODULE_DEST_FILE,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: Object.keys(dependencies),
  plugins: [
    resolve(),
    babel({
      babelrc: false,
		exclude: 'node_modules/**',
		// Tell babel to accept the `static READONLY_DEFAULT = false;` properties found in some places.
		// TODO: reconsider whether that is a good idea.
      plugins: [[require('@babel/plugin-proposal-class-properties'), { loose: true }]],
    }),
  ],
};
