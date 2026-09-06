# Despliegue en Vercel

## Opción recomendada

1. Vercel → Add New Project.
2. Importar `JuanCopado/compraradar-ai`.
3. Mantener configuración por defecto.
4. Deploy.

## Variables opcionales

```txt
PRICESAPI_KEY=
KEEPA_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Pruebas tras deploy

```txt
/api/health
/api/search?q=barata
/api/config/status
```

## Precio vivo

```txt
/api/live/search?q=Philips%20Serie%205000&country=ES
```

Si no hay `PRICESAPI_KEY`, responde `missing_key` sin romper la app.
