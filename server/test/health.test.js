import test from 'node:test'
import assert from 'node:assert'
import { spawn } from 'node:child_process'
import http from 'node:http'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const serverDir = path.dirname(fileURLToPath(import.meta.url))
const entry = path.join(serverDir, '..', 'index.js')
const PORT = 6173

function get(pathname) {
  return new Promise((resolve, reject) => {
    http
      .get({ host: '127.0.0.1', port: PORT, path: pathname }, (res) => {
        let body = ''
        res.on('data', (chunk) => (body += chunk))
        res.on('end', () => resolve({ status: res.statusCode, body }))
      })
      .on('error', reject)
  })
}

async function startServer(t) {
  const child = spawn(process.execPath, [entry], {
    env: { ...process.env, PORT: String(PORT), GIT_COMMIT: 'test-commit' },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  t.after(() => {
    child.kill()
  })
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('server did not start in time')), 15000)
    child.stdout.on('data', (data) => {
      if (String(data).includes('Server running')) {
        clearTimeout(timer)
        resolve()
      }
    })
    child.on('error', reject)
  })
  return child
}

test('GET /health returns ok and a commit field (no database needed)', async (t) => {
  await startServer(t)
  const res = await get('/health')
  assert.strictEqual(res.status, 200)
  const data = JSON.parse(res.body)
  assert.strictEqual(data.status, 'ok')
  assert.strictEqual(data.commit, 'test-commit')
})

test('GET /metrics returns Prometheus text with interviewx_ metrics', async (t) => {
  await startServer(t)
  await get('/health')
  const res = await get('/metrics')
  assert.strictEqual(res.status, 200)
  assert.match(res.body, /interviewx_uptime_seconds \d+/)
  assert.match(res.body, /interviewx_http_requests_total\{method="GET",path="\/health"\} \d+/)
})

test('GET / returns running status', async (t) => {
  await startServer(t)
  const res = await get('/')
  assert.strictEqual(res.status, 200)
  assert.strictEqual(JSON.parse(res.body).status, 'running')
})
