import { build } from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

// Build the npm entry point, dependencies stay external
build({
  entryPoints: ['src/VisualEditor.tsx'],
  target: 'es2020',
  format: 'esm',
  outfile: 'dist/VisualEditor.js',
  jsxFactory: 'jsx',
  jsxFragment: 'Fragment',
  logLevel: 'info',
  bundle: true,
  inject: ['./react-shim.js'],
  plugins: [nodeExternalsPlugin()],
}).catch(() => process.exit(1))
