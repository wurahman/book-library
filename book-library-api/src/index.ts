import bodyParser from 'body-parser'
import cors from 'cors'
import db from './database'
import dotenv from 'dotenv'
import express from 'express'
import queries from './queries'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 4000

// Middleware
app.use(bodyParser.json())
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://192.168.7.253:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

// Routes
app.get('/books', queries.getBooks)
app.post('/books', queries.addBook)
app.delete('/books/:id', queries.deleteBook)
app.put('/books/:id', queries.updateBookStatus)

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// Close the database connection on process termination
const exitHandler = (signal: any): void => {
  console.log('\n\nShutting down: Received', signal)
  db.close()
  server.close()
  process.exit(0)
}

process.on('SIGINT', exitHandler)
process.on('SIGTERM', exitHandler)
