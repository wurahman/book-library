import React, { useState } from 'react'
import { Card, CardActions, CardContent, Grid, IconButton, Button } from '@mui/material'
import { DeleteForever, TaskAltOutlined, ArrowCircleLeft } from '@mui/icons-material'

import { Book, BookStatus } from '../types/types.js'

import '../styles/books.scss'

type BookListProps = {
    books: Book[]
    deleteBook: (id: number) => void
    toggleBookStatus: (id: number, status: BookStatus) => void
}

type BookCardProps = {
    book: Book
    deleteBook: (id: number) => void
    toggleBookStatus: (id: number, status: BookStatus) => void
}

const BookCard: React.FC<BookCardProps> = ({ book, deleteBook, toggleBookStatus: toggleStatus }) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card style={{ border: '1px solid red' }}>
                <CardContent>
                    <b>{book.title}</b> by {book.author} {book.year && <span> ({book.year})</span>}
                </CardContent>
                <CardActions>
                    <IconButton className="delete" onClick={() => toggleStatus(book.id, book.status === 'available' ? 'borrowed' : 'available')}>
                        {book.status === 'available' ? <TaskAltOutlined className="available" /> : <ArrowCircleLeft className="borrowed" />}
                    </IconButton>
                    <IconButton className="delete" onClick={() => deleteBook(book.id)}>
                        <DeleteForever />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

const BookList: React.FC<BookListProps> = ({ books, deleteBook, toggleBookStatus: toggleStatus }) => {
    const [hideDeleted, setHideDeleted] = useState(true)

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Button className="btn" onClick={() => setHideDeleted(!hideDeleted)}>
                {hideDeleted ? 'Show' : 'Hide'} Deleted
            </Button>
            {books.length > 0 ? (
                <Grid container spacing={2}>
                    {books.map(
                        (book) =>
                            (book.isDeleted && hideDeleted) || <BookCard key={book.id} book={book} deleteBook={deleteBook} toggleBookStatus={toggleStatus} />
                    )}
                </Grid>
            ) : (
                <h3>Books not found</h3>
            )}
        </div>
    )
}

export default BookList
