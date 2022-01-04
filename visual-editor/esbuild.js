import { build } from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

build({
  entryPoints: ['src/VisualEditor.jsx'],
  target: 'es2020',
  format: 'esm',
  outfile: 'dist/VisualEditor.js',
  jsxFactory: 'jsx',
  jsxFragment: 'Fragment',
  logLevel: 'debug',
  bundle: true,
  inject: ['./react-shim.js'],
  plugins: [nodeExternalsPlugin()],
}).then(console.log, console.error)
/*
// Build the standalon version with every dependencies included
build({
  entryPoints: ['src/VisualEditor.jsx'],
  target: 'es2020',
  format: 'esm',
  outfile: 'dist/VisualEditor.standalone.js',
  jsxFactory: 'jsx',
  jsxFragment: 'Fragment',
  logLevel: 'debug',
  bundle: true,
  inject: ['./react-shim.js'],
}).then(console.log, console.error)
*/
