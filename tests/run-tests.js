const assert = require('assert');
const products = require('../src/data/products.seed.json');
const { finalPrice, dealScore, decisionLabel } = require('../src/core/scoring');
const { searchProducts } = require('../src/core/search');
const { configStatus } = require('../src/core/config');
const pricesapi = require('../src/providers/pricesapi');

assert(products.length >= 4, 'Dataset insuficiente');
for (const p of products) {
  assert(p.id && p.name && p.brand, 'Producto incompleto');
  assert(Number.isFinite(finalPrice(p)), 'Precio inválido');
  assert(dealScore(p) >= 0 && dealScore(p) <= 100, 'Score fuera de rango');
  assert(decisionLabel(p).length > 3, 'Decisión inválida');
}

assert(searchProducts(products, { q: 'barata' }).length >= 1, 'Búsqueda barata falla');
assert(searchProducts(products, { q: 'premium' }).length >= 1, 'Búsqueda premium falla');
assert(searchProducts(products, { brand: 'Philips' }).every(p => p.brand === 'Philips'), 'Filtro marca falla');
assert(searchProducts(products, { maxPrice: 30 }).every(p => finalPrice(p) <= 30), 'Filtro precio falla');

const status = configStatus({});
assert(status.pricesapi.configured === false, 'Sin key no debe figurar configurado');

const mapped = pricesapi.mapProduct({ pid: 123, title: 'Test', price: 10, currency: 'EUR' });
assert(mapped.provider_product_id === '123', 'Mapeo PricesAPI falla');

console.log('✅ Tests superados: CompraRadar AI');
console.log('Productos:', products.length);
console.log('Mejor:', searchProducts(products, { sort: 'score' })[0].name);
