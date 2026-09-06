const { configStatus } = require('../../src/core/config');

module.exports = function handler(req, res) {
  res.status(200).json({ providers: configStatus() });
};
