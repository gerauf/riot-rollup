import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import riot from 'rollup-plugin-riot';
import npm from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/app/app.js',
  dest: 'dest/bundle.js',
  format: 'iife',
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
    ],
    globals: {
      riot: 'riot',
      jquery: '$'
    },
    external: [
      'riot',
      'jquery'
    ]
}
