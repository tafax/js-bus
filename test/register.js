/**
 * Overrides the tsconfig used for the app.
 * In the test environment we need some tweaks.
 */
require('ts-node').register({
  lazy: true,
  project: './test',
  ignore: false
});
