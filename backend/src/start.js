/**
 * Module dependencies.
 */
const app = require('./app');

/**
  * Init routine
  */
(async () => {
  try {
    await app();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

