const { liveSearch } = require('../../src/providers/pricesapi');

module.exports = async function handler(req, res) {
  try {
    const q = req.query?.q || req.query?.query;
    if (!q) return res.status(400).json({ error: 'Falta parámetro q' });
    const data = await liveSearch({ query: q, country: req.query.country || 'ES', limit: req.query.limit || 8 });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message, payload: error.payload || null });
  }
};
