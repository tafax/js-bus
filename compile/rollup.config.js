
import { resolve, isAbsolute } from 'path';
import sourceMaps from 'rollup-plugin-sourcemaps';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { terser } from 'rollup-plugin-terser';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';

import pkg from '../package.json';

// Environment utilities.
const ENV = process.env.NODE_ENV || 'development';
const { ifProduction } = getIfUtils(ENV);

// The lib name and the entry point.
const LIB_NAME = pkg.name;
const PUBLIC_API = 'public_api.js';

// The directories.
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');

// Sets the paths for the input and output.
const PATHS = {
  entry: {
    esm5: resolve(DIST, 'esm5'),
    esm2015: resolve(DIST, 'esm2015'),
  },
  output: {
    bundles: resolve(DIST, 'bundles'),
    fesm5: resolve(DIST, 'fesm5'),
    fesm2015: resolve(DIST, 'fesm2015'),
  }
};

// The plugins to share between the configs.
const plugins = ([

  // Allow json resolution.
  json(),

  // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs).
  commonjs(),

  // Allow node_modules resolution, so you can use 'external' to control
  // which external modules to include in the bundle
  // https://github.com/rollup/rollup-plugin-node-resolve#usage
  nodeResolve(),

  // Resolve source maps to the original source.
  sourceMaps()

]);

const peerDependencies = Object.keys(pkg.peerDependencies) || [];
const isPeer = (moduleID) => !!peerDependencies.find(
  (value) => !!moduleID.includes(value)
);

const isExternal = (moduleID) => !(isAbsolute(moduleID) || moduleID.startsWith('.')) && isPeer(moduleID);

// The shared config.
const CommonConfig = {
  input: {},
  output: {},
  inlineDynamicImports: false,
  preserveSymlinks: true,
  // Just handle the external dependencies based on peer in package json.
  external: (moduleID) => isExternal(moduleID) || moduleID === 'tslib'
};

// Creates the UMD configuration.
const UMDConfig = {
  ...CommonConfig,
  input: resolve(PATHS.entry.esm5, PUBLIC_API),
  output: {
    file: resolve(PATHS.output.bundles, `${LIB_NAME}.umd.js`),
    format: 'umd',
    name: LIB_NAME,
    sourcemap: true,
    // Provides the global name to set in the bundle.
    globals: (moduleID) => moduleID
  },
  // For UMD we always need to bundle tslib.
  external: (moduleID) => isExternal(moduleID) && moduleID !== 'tslib',
  plugins: removeEmpty(
    ([
      ...plugins,
      ifProduction(uglify()),
      ifProduction(terser())
    ])
  ),
};

// Creates the flat esm5 configuration.
const FESM5Config = {
  ...CommonConfig,
  input: resolve(PATHS.entry.esm5, PUBLIC_API),
  output: [
    {
      file: resolve(PATHS.output.fesm5, `${LIB_NAME}.js`),
      format: 'es',
      sourcemap: true
    },
  ],
  plugins: removeEmpty(
    ([...plugins])
  ),
};

// Creates the flat esm2015 configuration.
const FESM2015Config = {
  ...CommonConfig,
  input: resolve(PATHS.entry.esm2015, PUBLIC_API),
  output: [
    {
      file: resolve(PATHS.output.fesm2015, `${LIB_NAME}.js`),
      format: 'es',
      sourcemap: true
    },
  ],
  plugins: removeEmpty(
    ([...plugins])
  ),
};

export default [
  UMDConfig,
  FESM5Config,
  FESM2015Config
];
