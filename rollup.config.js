import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import riot from 'rollup-plugin-riot';
import npm from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/main.js',
  dest: 'dest/bundle.js',
  format: 'umd',
  plugins: [
      json(),
      riot(),
      npm({
          jsnext: true,
          main: true,
          browser: true
      }),
      commonjs(),
      babel()
    ]
}
