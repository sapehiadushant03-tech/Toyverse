# ToyVerse

ToyVerse is a full-stack React and Express storefront for age-based educational toys.

## Local setup

1. Start MongoDB locally.
2. Copy `Backend/.env.example` to `Backend/.env`.
3. Set a strong `JWT_SECRET` and keep it private.
4. Install and seed the backend:

```powershell
cd Backend
npm install
npm run seed
npm start
```

5. In a second terminal, start the frontend:

```powershell
cd Frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`; the API runs on `http://localhost:5000`.

## Production configuration

- Set `MONGO_URL` to the production MongoDB connection string.
- Set `JWT_SECRET` to a strong secret unique to the deployment.
- Set `CORS_ORIGIN` to the public frontend origin.
- Set `VITE_API_URL` to the public API origin.
- Set `NODE_ENV=production`.

Run `npm run build` inside `Frontend` and deploy `Frontend/dist` with the Node API.

## Verification

- `Frontend`: `npm run build`
- `Frontend`: `npm run lint`
- `Backend`: `npm run seed`
- `Backend`: `npm start`
