const products = require('../src/data/products.seed.json');
const { configStatus } = require('../src/core/config');

module.exports = function handler(req, res) {
  res.status(200).json({
    ok: true,
    app: 'CompraRadar AI',
    version: '1.0.0-vercel',
    mode: process.env.PRICESAPI_KEY ? 'real-ready' : 'demo-reference',
    providers: configStatus(),
    products: products.length,
    timestamp: new Date().toISOString()
  });
};
