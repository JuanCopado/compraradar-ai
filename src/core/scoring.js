function finalPrice(input) {
  const price = Number(input.final_price ?? input.price ?? input.reference_price ?? 0);
  const shipping = Number(input.shipping ?? 0);
  const coupon = Number(input.coupon_value ?? 0);
  return Math.max(0, price + shipping - coupon);
}

function dealScore(product) {
  const price = finalPrice(product);
  const buyBelow = Number(product.buy_below ?? price);
  const waitAbove = Number(product.wait_above ?? price * 1.25);
  const confidence = Number(product.confidence ?? 50);

  let priceScore = 50;
  if (price <= buyBelow) priceScore = 95;
  else if (price >= waitAbove) priceScore = 35;
  else priceScore = 35 + ((waitAbove - price) / Math.max(1, waitAbove - buyBelow)) * 60;

  const placeholderPenalty = /placeholder|no verificado/i.test(String(product.price_status || '')) ? -8 : 0;
  return Math.max(0, Math.min(100, Math.round(priceScore * 0.64 + confidence * 0.36 + placeholderPenalty)));
}

function decisionLabel(product) {
  const score = dealScore(product);
  if (score >= 85) return 'COMPRAR';
  if (score >= 70) return 'VERIFICAR_PRECIO_VIVO';
  if (score >= 55) return 'ESPERAR';
  return 'NO_COMPRAR_SIN_VERIFICAR';
}

function explainDecision(product) {
  const label = decisionLabel(product);
  const price = finalPrice(product);
  if (label === 'COMPRAR') return `Comprar si encaja con la necesidad. Precio de referencia: ${price.toFixed(2)} ${product.currency || 'EUR'}.`;
  if (label === 'VERIFICAR_PRECIO_VIVO') return 'Buena opción, pero antes de comprar conviene verificar precio vivo, stock y envío.';
  if (label === 'ESPERAR') return 'Esperar una bajada o buscar alternativa: no está suficientemente cerca de zona óptima.';
  return 'No comprar sin nueva verificación de precio, fuente y vendedor.';
}

module.exports = { finalPrice, dealScore, decisionLabel, explainDecision };
