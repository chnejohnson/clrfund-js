import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const name = require('./package.json').main.replace(/\.js$/, '')

import pkg from './package.json'

export const rollupExternal = [...Object.keys(pkg.dependencies), /@ethersproject\/*/, /ethers\/*/]

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  external: rollupExternal,
})

export default [
  bundle({
    plugins: [esbuild(), json(), nodeResolve(), commonjs()],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: 'es',
    },
  }),
]
