import { build } from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import stylePlugin from 'esbuild-style-plugin'

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
  plugins: [
    nodeExternalsPlugin(),
    stylePlugin({
      renderOptions: {
        sassOptions: {
          includePaths: ['./node_modules'],
        },
      },
    }),
  ],
}).then(console.log, console.error)
