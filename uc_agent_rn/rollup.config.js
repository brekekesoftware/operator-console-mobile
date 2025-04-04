import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image'
import url from '@rollup/plugin-url'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
    {
      file: 'dist/ucagentrn.iife.js',
      format: 'iife',
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
    'EventEmitter',
    /react-native\/.*/,
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.json'],
      preferBuiltins: true,
      resolveOnly: [/^(?!react-native).*$/],
      rootDir: path.join(__dirname, 'src'),
    }),
    commonjs({
      include: [/node_modules/, 'src/js/**'],
      exclude: [/react-native\/.*/],
      transformMixedEsModules: true,
      dynamicRequireTargets: [
        // 'src/js/**/*.js',
        '**/js/brekeke/*.js',
        // 'src/index.js',
        // '*/js/brekeke/ucclient/ucclient.js',
      ],
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      exclude: ['node_modules/**', /react-native\/.*/],
      include: ['src/**', 'src/js/**', '**/js/brekeke/*.js'],
    }),
    json(),
    image(),
    url({
      include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif', '**/*.mp3'],
      limit: 0,
      emitFiles: true,
      fileName: '[name][extname]',
      destDir: 'dist/assets',
    }),
  ],
}
