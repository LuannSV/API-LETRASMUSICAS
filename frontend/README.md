## Frontend

### Comandos

```bash
pnpm dev       # desenvolvimento
pnpm build     # build produção
pnpm start     # servidor produção
pnpm lint      # lint
```

### Variáveis de ambiente

Copie `.env.local.example` para `.env.local` e ajuste:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### Rotas

- `/` Home
- `/users` Lista usuários (GET `{API_BASE_URL}/users`)

### Estrutura

- `src/app/` App Router (Next.js 15)
- `src/lib/api.ts` Helper de API (fetch + tipagem)
