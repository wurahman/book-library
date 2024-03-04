import React, { useEffect, useState } from 'react'
import { Book } from '../types/types.js'
import { books as bookData } from '../data/books.js'
import { TiDelete } from 'react-icons/ti'

import '../styles/books.scss'

console.log(bookData)

const BookList = () => {
    const [books, setBooks] = useState([] as Book[])

    /**
     * hard coded list of books
     */
    useEffect(() => {
        // TODO: Get it from an API call
        setTimeout(() => {
            setBooks(bookData)
        }, 2000)
    }, [])

    function handleDelete(isbn: string) {
        setBooks(books.filter((b) => b.isbn != isbn))
    }

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book.isbn}>
                            <b>{book.title}</b> by {book.author} ({book.year})
                            <span className="delete" onClick={() => handleDelete(book.isbn)}>
                                <TiDelete />
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <h3>Books not found</h3>
            )}
        </div>
    )
}

export default BookList
