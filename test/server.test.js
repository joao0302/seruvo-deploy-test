import assert from 'node:assert/strict';
import { test } from 'node:test';
import { server } from '../server.js';

test('healthz e info', async () => {
  process.env.APP_MESSAGE = 'ola';
  process.env.APP_SECRET = 'nao-deve-aparecer';
  await new Promise((r) => server.listen(0, r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const health = await (await fetch(`${base}/healthz`)).json();
  assert.equal(health.status, 'ok');
  const info = await fetch(`${base}/info`);
  const text = await info.text();
  assert.equal(JSON.parse(text).message, 'ola');
  assert.equal(JSON.parse(text).secretPresent, true);
  assert.equal(text.includes('nao-deve-aparecer'), false);
  assert.equal((await fetch(`${base}/nada`)).status, 404);
  server.close();
});
