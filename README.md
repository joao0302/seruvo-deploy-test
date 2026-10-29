# seruvo-deploy-test

Aplicação mínima (Node.js, sem dependências, sem banco) para testar o fluxo de publicação do Seruvo.

- `GET /healthz` → `{"status":"ok","app":"seruvo-deploy-test","version":"v1"}`
- `GET /info` → versão, `APP_MESSAGE` (variável pública) e se `APP_SECRET` está presente (nunca o valor)
- Porta: `3000` (ou `PORT`). Comando de início: `npm start`.

Teste de redeploy: troque `VERSION = 'v1'` por `'v2'` em `server.js`, faça commit e Redeploy.
