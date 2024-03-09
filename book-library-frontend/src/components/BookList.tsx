import React, { useEffect, useState } from 'react'
import { Book, BookStatus } from '../types/types.js'
import { TiDelete } from 'react-icons/ti'
import { FaSignOutAlt, FaArrowLeft } from 'react-icons/fa'
import { Button } from '@mui/base'

import '../styles/books.scss'

type BookListProps = {
    books: Book[]
    deleteBook: (isbn: string) => void
    toggleBookStatus: (isbn: string) => void
}

const BookList: React.FC<BookListProps> = ({ books, deleteBook, toggleBookStatus: toggleStatus }) => {
    const [hideDeleted, setHideDeleted] = useState(true)

    console.log('BookList component rendered')

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {/* <Button className="btn" onClick={() => setHideDeleted(!hideDeleted)}>
                {hideDeleted ? 'Show' : 'Hide'} Deleted
            </Button> */}
            {books.length > 0 ? (
                <ul>
                    {books.map(
                        (book) =>
                            (book.isDeleted && hideDeleted) || (
                                <li key={book.isbn}>
                                    <b>{book.title}</b> by {book.author} ({book.year})
                                    <span className="delete" onClick={() => deleteBook(book.isbn)}>
                                        <TiDelete />
                                    </span>
                                    <span onClick={() => toggleStatus(book.isbn)}>{book.status === 'Available' ? <FaSignOutAlt /> : <FaArrowLeft />}</span>
                                </li>
                            )
                    )}
                </ul>
            ) : (
                <h3>Books not found</h3>
            )}
        </div>
    )
}

export default BookList
