const https = require('https');
const BASE_URL = 'https://api.pricesapi.io/api/v1';

function requestJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      let raw = '';
      res.on('data', (chunk) => (raw += chunk));
      res.on('end', () => {
        let parsed = {};
        try { parsed = raw ? JSON.parse(raw) : {}; } catch (err) { return reject(new Error('Respuesta JSON inválida')); }
        if (res.statusCode >= 400) {
          const e = new Error(parsed?.error?.message || `Proveedor devolvió HTTP ${res.statusCode}`);
          e.statusCode = res.statusCode;
          e.payload = parsed;
          return reject(e);
        }
        resolve(parsed);
      });
    });
    req.on('error', reject);
    req.setTimeout(45000, () => req.destroy(new Error('Timeout PricesAPI')));
  });
}

function mapProduct(p) {
  return {
    provider: 'pricesapi',
    provider_product_id: String(p.pid || p.id || ''),
    title: p.title,
    price: Number(p.price || 0),
    currency: p.currency || 'EUR',
    source: p.source || null,
    image: p.image || null,
    rating: p.rating || null,
    reviews: p.reviews || p.reviewCount || null,
    delivery: p.delivery || p.delivery_info || null,
    raw: p
  };
}

async function liveSearch({ query, country = 'ES', limit = 8, apiKey = process.env.PRICESAPI_KEY }) {
  if (!apiKey) return { mode: 'missing_key', provider: 'pricesapi', message: 'Falta PRICESAPI_KEY', products: [] };
  const params = new URLSearchParams({ q: query, country: country.toLowerCase(), limit: String(limit) });
  const data = await requestJson(`${BASE_URL}/products/search?${params.toString()}`, { 'x-api-key': apiKey });
  return { mode: 'real', provider: 'pricesapi', products: (data?.data?.products || []).map(mapProduct), raw: data };
}

module.exports = { liveSearch, mapProduct };
