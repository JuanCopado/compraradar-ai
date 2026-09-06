const { dealScore, finalPrice } = require('./scoring');

function normalize(text) {
  return String(text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function matches(product, query) {
  const q = normalize(query);
  if (!q) return true;

  const blob = normalize([
    product.id,
    product.category,
    product.name,
    product.brand,
    product.segment,
    product.recommendation,
    ...(product.features || []),
    ...(product.risks || [])
  ].join(' '));

  if (q.includes('barata') || q.includes('barato') || q.includes('econom')) {
    return finalPrice(product) <= 50 || blob.includes('barata') || blob.includes('econom');
  }
  if (q.includes('premium') || q.includes('alta gama')) {
    return blob.includes('premium') || blob.includes('alta gama');
  }
  if (q.includes('piel sensible')) {
    return blob.includes('piel sensible');
  }
  if (q.includes('mejor compra')) {
    return dealScore(product) >= 85;
  }

  return blob.includes(q);
}

function searchProducts(products, params = {}) {
  const query = params.q || params.query || '';
  const brand = normalize(params.brand || '');
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : null;
  const sort = params.sort || 'score';

  let results = products.filter((p) => matches(p, query));

  if (brand && brand !== 'todos') results = results.filter((p) => normalize(p.brand) === brand);
  if (Number.isFinite(maxPrice)) results = results.filter((p) => finalPrice(p) <= maxPrice);

  if (sort === 'price') results.sort((a, b) => finalPrice(a) - finalPrice(b));
  else if (sort === 'confidence') results.sort((a, b) => Number(b.confidence || 0) - Number(a.confidence || 0));
  else results.sort((a, b) => dealScore(b) - dealScore(a));

  return results;
}

module.exports = { normalize, matches, searchProducts };
