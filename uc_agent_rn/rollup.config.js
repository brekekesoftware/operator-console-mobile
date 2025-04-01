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
    // Add these to prevent bundling internal RN modules
    'EventEmitter',
    /react-native\/.*/, // Exclude all react-native internal modules
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.json'],
      preferBuiltins: true,
      resolveOnly: [/^(?!react-native).*$/],
    }),
    commonjs({
      include: /node_modules/,
      exclude: [/react-native\/.*/],
      transformMixedEsModules: true,
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      exclude: ['node_modules/**', /react-native\/.*/],
    }),
    json(),
    image(),
  ],
}
