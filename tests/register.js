/**
 * Overrides the tsconfig used for the app.
 * In the test environment we need some tweaks.
 */

const path = require('path');
const tsNode = require('ts-node');
const tsConfigPaths = require('tsconfig-paths');
const mainTSConfig = require('./tsconfig.json');

tsConfigPaths.register({
  baseUrl: path.join(process.cwd(), 'tests', mainTSConfig.compilerOptions.baseUrl),
  paths: mainTSConfig.compilerOptions.paths
});

tsNode.register({
  project: 'tests/tsconfig.json'
});
