function present(value) {
  return Boolean(value && String(value).trim() && !String(value).includes('your_'));
}

function configStatus(env = process.env) {
  return {
    pricesapi: {
      configured: present(env.PRICESAPI_KEY),
      required: 'PRICESAPI_KEY',
      purpose: 'Búsqueda multitienda europea y ofertas.'
    },
    keepa: {
      configured: present(env.KEEPA_API_KEY),
      required: 'KEEPA_API_KEY',
      purpose: 'Histórico Amazon y alertas por ASIN.'
    },
    supabase: {
      configured: present(env.SUPABASE_URL) && present(env.SUPABASE_SERVICE_ROLE_KEY),
      required: 'SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY',
      purpose: 'Histórico propio, snapshots y persistencia.'
    },
    apify: {
      configured: present(env.APIFY_TOKEN),
      required: 'APIFY_TOKEN',
      purpose: 'Extracción controlada cuando no exista API.'
    },
    coupons: {
      configured: present(env.AWIN_TOKEN) || present(env.ADMITAD_TOKEN),
      required: 'AWIN_TOKEN or ADMITAD_TOKEN',
      purpose: 'Cupones, campañas y afiliación.'
    }
  };
}

module.exports = { configStatus };
