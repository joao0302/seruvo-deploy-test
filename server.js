// Aplicação mínima para testar o deploy pelo Seruvo. Sem dependências e sem banco.
// Nunca devolve valores de variáveis: só se estão presentes.
import { createServer } from 'node:http';

// Para o teste de redeploy: troque 'v1' por 'v2', faça commit e clique em Redeploy no Seruvo.
const VERSION = 'v1';
const PORT = Number(process.env.PORT ?? 3000);

const send = (res, status, body) => {
  res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' });
  res.end(JSON.stringify(body));
};

export const server = createServer((req, res) => {
  const path = new URL(req.url, 'http://x').pathname;
  if (req.method !== 'GET') return send(res, 405, { error: 'method not allowed' });
  if (path === '/healthz') return send(res, 200, { status: 'ok', app: 'seruvo-deploy-test', version: VERSION });
  if (path === '/info') {
    return send(res, 200, {
      version: VERSION,
      // Variável pública de teste: o valor aparece. O segredo: só se está presente.
      message: process.env.APP_MESSAGE ?? null,
      secretPresent: !!process.env.APP_SECRET,
      node: process.version,
    });
  }
  if (path === '/') return send(res, 200, { app: 'seruvo-deploy-test', version: VERSION, try: ['/healthz', '/info'] });
  return send(res, 404, { error: 'not found' });
});

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  server.listen(PORT, () => console.log(`seruvo-deploy-test ${VERSION} ouvindo na porta ${PORT}`));
}
