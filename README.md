# Diocese of Syunik Platform

Production-oriented monorepo for the Diocese of Syunik public platform.

## Applications

- `apps/web` - React, TypeScript, Vite, Tailwind CSS
- `apps/api` - Node.js, Express, TypeScript, Prisma
- `apps/mobile` - Expo, React Native, TypeScript

## Local development

```bash
npm install
copy apps\api\.env.example apps\api\.env
npm run prisma:generate
npm run dev
```

- Web: `http://localhost:5173`
- API health: `http://localhost:4000/api/v1/health`

## Mobile development

```bash
cp apps/mobile/.env.example apps/mobile/.env
npm run prisma:generate
npm run dev
npm run dev:mobile
```

The mobile app reads from the same API as the website. For a physical phone, set `EXPO_PUBLIC_API_URL` and `EXPO_PUBLIC_ASSET_URL` in `apps/mobile/.env` to your computer's LAN address, for example `http://192.168.1.20:4000/api/v1` and `http://192.168.1.20:5173`.
