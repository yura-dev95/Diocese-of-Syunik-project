# Diocese of Syunik Platform

Production-oriented monorepo for the Diocese of Syunik public platform.

## Applications

- `apps/web` - React, TypeScript, Vite, Tailwind CSS
- `apps/api` - Node.js, Express, TypeScript, Prisma

## Local development

```bash
npm install
copy apps\api\.env.example apps\api\.env
npm run prisma:generate
npm run dev
```

- Web: `http://localhost:5173`
- API health: `http://localhost:4000/api/v1/health`

