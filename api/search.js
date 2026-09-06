const products = require('../src/data/products.seed.json');
const { searchProducts } = require('../src/core/search');
const { finalPrice, dealScore, decisionLabel, explainDecision } = require('../src/core/scoring');

function enrich(product) {
  return {
    ...product,
    final_price: finalPrice(product),
    deal_score: dealScore(product),
    decision_label: decisionLabel(product),
    decision_explanation: explainDecision(product)
  };
}

module.exports = function handler(req, res) {
  const results = searchProducts(products, req.query || {}).map(enrich);
  res.status(200).json({ mode: 'demo-reference', count: results.length, results, best: results[0] || null });
};
