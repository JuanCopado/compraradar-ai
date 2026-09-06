const { configStatus } = require('../src/core/config');
const products = require('../src/data/products.seed.json');

if (!Array.isArray(products) || products.length === 0) {
  throw new Error('Dataset vacío');
}

const status = configStatus(process.env);
console.log('✅ Smoke test OK');
console.log(JSON.stringify({ products: products.length, providers: status }, null, 2));
