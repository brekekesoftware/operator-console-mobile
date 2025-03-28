import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/ucagentrn.js',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'dist/ucagentrn.esm.js',
      format: 'es',
      exports: 'named',
    },
  ],
  external: [
    'react',
    'react-native',
    'react-native-gesture-handler',
    'react-native-linear-gradient',
    'react-native-video',
    'react-native-fs',
    'react-native-image-picker',
    'react-native-document-picker',
    'react-native-share',
    'react-native-hyperlink',
    'react-native-clipboard',
    'react-native-dimensions',
    'react-native-linking',
    'react-native-platform-touchable',
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.json'],
      preferBuiltins: true,
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
    }),
    babel({
      babelHelpers: 'bundled',
      // presets: [
      //   'module:metro-react-native-babel-preset'
      // ],
      presets: ['@babel/preset-env', '@babel/preset-react'],
      // plugins: [
      //   ['@babel/plugin-transform-modules-commonjs', { strict: false }]
      // ],
      // exclude: 'node_modules/**',
    }),
    json(),
    image(),
  ],
}
