const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const image = require('@rollup/plugin-image')
const babel = require('@rollup/plugin-babel').default
const { terser } = require('rollup-plugin-terser')
const alias = require('@rollup/plugin-alias')
const copy = require('rollup-plugin-copy')

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/release/index.cjs.js',
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: 'dist/release/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    alias({
      entries: [
        {
          find: 'react-native/Libraries/vendor/emitter/EventEmitter',
          replacement: require.resolve('./shimEvent.js'),
        },
      ],
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.native.js', '.web.js'],
      preferBuiltins: false,
    }),
    commonjs(),
    image(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
      extensions: ['.js', '.jsx'],
    }),
    copy({
      targets: [
        { src: 'src/icons/**/*', dest: 'dist/' },
        { src: 'src/js/**/*', dest: 'dist/' },
      ],
      flatten: false,
      hook: 'writeBundle',
    }),
    terser(),
  ],
  external: id => {
    return [
      'react',
      'react-native',
      '@react-native-async-storage/async-storage',
      'react-native-clipboard',
      'react-native-date-picker',
      'react-native-dimensions',
      'react-native-document-picker',
      'react-native-draggable-flatlist',
      'react-native-fs',
      'react-native-gesture-handler',
      'react-native-image-picker',
      'react-native-linear-gradient',
      'react-native-reanimated',
      'react-native-share',
      'react-native-sound',
      'react-native-svg',
      'react-native-video',
      'rn-fetch-blob',
      'eventemitter3',
      'react-native-webrtc',
    ].some(pkg => id === pkg || id.startsWith(pkg + '/'))
  },
}
