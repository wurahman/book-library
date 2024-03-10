import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import queries from './queries'

const app = express()

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

export default app
