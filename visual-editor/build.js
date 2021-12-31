import { build } from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

build({
  entryPoints: ['src/VisualEditor.jsx'],
  target: 'es2020',
  format: 'esm',
  outdir: 'dist',
  jsxFactory: 'jsx',
  jsxFragment: 'Fragment',
  logLevel: 'debug',
  bundle: true,
  inject: ['./react-shim.js'],
  plugins: [nodeExternalsPlugin()],
}).then(console.log, console.error)
