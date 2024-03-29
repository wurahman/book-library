import '../styles/books.scss'

import { Book, BookStatus } from '../types/types.js'
import { Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, Tooltip } from '@mui/material'

import { DeleteForever } from '@mui/icons-material'
import React from 'react'

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
            <Card>
                <CardContent>
                    <b>{book.title}</b>
                    <br />
                    {book.author} {book.year && <span> ({book.year})</span>}
                </CardContent>
                <CardActions>
                    <Tooltip title={book.status === 'available' ? 'Borrow Book' : 'Return a borrowed book'}>
                        <Button
                            size="small"
                            variant="outlined"
                            className="delete"
                            onClick={() => toggleStatus(book.id, book.status === 'available' ? 'borrowed' : 'available')}
                            {...(book.status === 'available' ? { color: 'primary' } : { color: 'secondary' })}
                        >
                            {book.status === 'available' ? 'Borrow' : 'Return'}
                        </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            size="small"
                            endIcon={<DeleteForever />}
                            className="delete"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete book') === true) {
                                    deleteBook(book.id)
                                }
                            }}
                        >
                            Delete
                        </Button>
                    </Tooltip>
                </CardActions>
            </Card>
        </Grid>
    )
}

const BookList: React.FC<BookListProps> = ({ books, deleteBook, toggleBookStatus: toggleStatus }) => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {books.length > 0 ? (
                <Grid container spacing={2}>
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} deleteBook={deleteBook} toggleBookStatus={toggleStatus} />
                    ))}
                </Grid>
            ) : (
                <h3>Books not found</h3>
            )}
        </div>
    )
}

export default BookList
