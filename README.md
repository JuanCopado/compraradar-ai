# CompraRadar AI

Comparador inteligente de precios, histórico promocional y recomendación de compra.

## Estado

Versión pública inicial preparada para Vercel.

- Frontend estático en `public/index.html`.
- API serverless en `/api`.
- Dataset inicial de afeitadoras.
- Scoring IA.
- Preparado para `PRICESAPI_KEY`.

## Endpoints

```txt
/api/health
/api/search?q=Philips
/api/config/status
/api/live/search?q=Philips%20Serie%205000&country=ES
```

## Despliegue en Vercel

1. Entra en Vercel.
2. Importa este repositorio: `JuanCopado/compraradar-ai`.
3. Framework preset: Other.
4. Build command: vacío.
5. Output directory: vacío.
6. Deploy.

La URL será algo tipo:

```txt
https://compraradar-ai.vercel.app
```

## Activar precio vivo

En Vercel → Project → Settings → Environment Variables:

```txt
PRICESAPI_KEY=tu_clave
```

Después prueba:

```txt
/api/live/search?q=Philips%20Serie%205000&country=ES
```

## Desarrollo local

```bash
npm test
```

## Próximos pasos

1. Conectar Vercel.
2. Añadir `PRICESAPI_KEY`.
3. Añadir Supabase para histórico.
4. Añadir cupones con Awin/Admitad.
5. Registrar dominio `compraradar.ai` cuando proceda.
