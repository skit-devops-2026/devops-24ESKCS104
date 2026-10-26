import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

const app = express()
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://interviewiq-client-tbtt.onrender.com",
    ],
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

// Mid-term 2 (Modules 5-7): observability endpoints. These do not need the
// database, so /health stays up even while MongoDB is still connecting.
const GIT_COMMIT = process.env.GIT_COMMIT || process.env.RENDER_GIT_COMMIT || 'dev'
const startedAt = Date.now()
const httpRequestsTotal = {}

app.use((req, res, next) => {
  const key = `${req.method} ${req.path}`
  httpRequestsTotal[key] = (httpRequestsTotal[key] || 0) + 1
  next()
})

app.get('/', (req, res) => {
  res.json({ status: 'running', service: 'interviewx-backend', commit: GIT_COMMIT })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', commit: GIT_COMMIT })
})

app.get('/metrics', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startedAt) / 1000)
  const mem = process.memoryUsage()
  const lines = []
  lines.push('# HELP interviewx_uptime_seconds Time since the server started.')
  lines.push('# TYPE interviewx_uptime_seconds gauge')
  lines.push(`interviewx_uptime_seconds ${uptimeSeconds}`)
  lines.push('# HELP interviewx_http_requests_total Total HTTP requests by method and path.')
  lines.push('# TYPE interviewx_http_requests_total counter')
  for (const [key, value] of Object.entries(httpRequestsTotal)) {
    const [method, path] = key.split(' ')
    lines.push(`interviewx_http_requests_total{method="${method}",path="${path}"} ${value}`)
  }
  lines.push('# HELP interviewx_resident_memory_bytes Resident memory used by the server process.')
  lines.push('# TYPE interviewx_resident_memory_bytes gauge')
  lines.push(`interviewx_resident_memory_bytes ${mem.rss}`)
  res.set('Content-Type', 'text/plain; version=0.0.4')
  res.send(lines.join('\n') + '\n')
})

app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview" , interviewRouter)
app.use("/api/payment" , paymentRouter)

const PORT = process.env.PORT || 6000
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
    connectDb()
})
