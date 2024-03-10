import type { NextFunction, Request, Response } from 'express'

import db from './database'
import { validationResult } from 'express-validator'

const getBooks = (req: Request, res: Response): void => {
  const pageStr = req.query.page as string
  const limitStr = req.query.limit as string

  const page = !isNaN(parseInt(pageStr)) ? parseInt(pageStr) : 1
  const limit = !isNaN(parseInt(limitStr)) ? parseInt(limitStr) : 100
  const offset = (page - 1) * limit
  const query = `SELECT * FROM books LIMIT ${limit} OFFSET ${offset}`
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json(rows)
  })
}

const addBook = (req: Request, res: Response, next: NextFunction): void => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    res.status(400).json({ error: 'Validation error' })
    next()
    return
  }

  const { title, author } = req.body
  const status = 'available'
  const query = 'INSERT INTO books (title, author, status) VALUES (?, ?, ?)'
  db.run(query, [title, author, status], function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      next()
    } else {
      res.status(201).json({ id: this.lastID, title, author, status })
      next()
    }
  })
}

const updateBookStatus = (req: Request, res: Response): void => {
  const { id } = req.params
  const { status } = req.body
  const query = 'UPDATE books SET status = ? WHERE id = ?; SELECT * FROM books WHERE id = ?'
  db.run(query, [status, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(200).json({ id, status })
  })
}

const deleteBook = (req: Request, res: Response): void => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    res.status(400).json({ error: 'Validation Error' })
    return
  }

  const { id } = req.params
  const query = 'DELETE FROM books WHERE id = ?'
  db.run(query, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(204).send()
  })
}

export default { getBooks, addBook, updateBookStatus, deleteBook }
