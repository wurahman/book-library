import app from '../src/index'
import request from 'supertest'

describe('Books API', () => {
  test('GET /books returns list of books', async () => {
    const response = await request(app).get('/books')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})
