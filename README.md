# SkyTrade Frontend

Modern trading terminal and admin console built with React, Vite, TypeScript, and Material UI for the BackAPI Trading Platform.

## Getting Started

```bash
npm install
npm run dev
```

The development server runs on [http://localhost:5173](http://localhost:5173). Configure environment variables as needed or update `src/api/client.ts` to point to a different API base URL.

## Features

- Authentication flow with JWT persistence
- Client trading workspace with dashboard, market explorer, orders, portfolio, wallet, and watchlists
- Admin console to manage users, instruments, wallet adjustments, system telemetry, and access tokens
- Material UI-based dark theme inspired by pro trading terminals
- React Query powered data fetching and caching
- Recharts for performance visualisations
