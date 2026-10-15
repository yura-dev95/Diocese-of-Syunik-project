# Diocese of Syunik Platform

Production-oriented monorepo for the Diocese of Syunik public platform.

## Applications

- `apps/web` - React, TypeScript, Vite, Tailwind CSS
- `apps/api` - Node.js, Express, TypeScript, Prisma
- `apps/mobile` - Expo, React Native, TypeScript

## Local development

```bash
npm install
cp apps/api/.env.example apps/api/.env
docker compose up -d postgres
npm run prisma:generate
npm run prisma:migrate -w @syunik/api
npm run dev
```

- Web: `http://localhost:5174`
- API health: `http://localhost:4000/api/v1/health`

Before running `npm run prisma:seed -w @syunik/api`, set `ADMIN_EMAIL` and a unique `ADMIN_PASSWORD` of at least 12 characters in your local environment. The seed uses these values only when it creates the admin account.

To create or reset an admin account, set `ADMIN_EMAIL` and a unique app-specific `ADMIN_PASSWORD` in `apps/api/.env`, then run:

```bash
npm run admin:create -w @syunik/api
```

Admin sign-in is separate from public registration. Public visitors cannot create admin accounts.

## Mobile development

```bash
cp apps/mobile/.env.example apps/mobile/.env
npm run prisma:generate
npm run dev
npm run dev:mobile
```

The mobile app reads from the same API as the website. For a physical phone, set `EXPO_PUBLIC_API_URL` and `EXPO_PUBLIC_ASSET_URL` in `apps/mobile/.env` to your computer's LAN address, for example `http://192.168.1.20:4000/api/v1` and `http://192.168.1.20:5174`.
