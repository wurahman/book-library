import app from '../src/app'
import request from 'supertest'

describe('Books API', () => {
  test('GET /books returns list of books', async () => {
    const response = await request(app).get('/books')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test('POST /books adds a new book', async () => {
    const newBook = { title: 'New Book', author: 'John Doe' }
    const response = await request(app).post('/books').send(newBook)
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject(newBook)
  })

  test('POST /books fails on empty title', async () => {
    const newBook = { author: 'John Doe' }
    const response = await request(app).post('/books').send(newBook)
    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({ error: 'Validation error' })
  })

  test('POST /books fails on empty author', async () => {
    const newBook = { author: '', title: 'New Book' }
    const response = await request(app).post('/books').send(newBook)
    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({ error: 'Validation error' })
  })

  test('DELETE /books/:id deletes a book', async () => {
    const bookId = '1'
    const response = await request(app).delete(`/books/${bookId}`)
    expect(response.status).toBe(204)
  })

  test('DELETE /books/:id should fail on non numeric id', async () => {
    const bookId = 'incorrect-id'
    const response = await request(app).delete(`/books/${bookId}`)
    expect(response.status).toBe(400)
  })

  test('PUT /books/:id updates a book status', async () => {
    // Assuming you have a book ID and status to update
    const bookId = 'your-book-id'
    const updatedStatus = { status: 'borrowed' }
    const response = await request(app).put(`/books/${bookId}`).send(updatedStatus)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(updatedStatus)
  })
})
