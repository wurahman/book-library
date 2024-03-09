import React, { useEffect, useState } from 'react'
import { Book, BookStatus } from '../types/types.js'
import { books as rawBookData } from '../data/books.js'
import BookList from './BookList'
import BookForm from './BookForm'

const loadBookData = async (): Promise<Book[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                rawBookData && rawBookData.length > 0
                    ? rawBookData.map((b) => {
                          return { ...b, isDeleted: false, status: 'Available' }
                      })
                    : []
            )
        }, 1000)
    })
}

const Library = () => {
    const [books, setBooks] = useState([] as Book[])

    /**
     * hard coded list of books
     */
    useEffect(() => {
        loadBookData().then(setBooks)
    }, [])

    function validateBookData(formData: any) {
        const errors: any = {}
        if (formData.title === '') {
            errors.title = 'Title is required'
        }
        if (formData.author === '') {
            errors.author = 'Author is required'
        }
        if (books.find((b) => b.title === formData.title && b.author === formData.author)) {
            errors.title = 'Book already exists'
        }
        return errors
    }

    function addBook(formData: any) {
        const errors = validateBookData(formData)
        if (Object.keys(errors).length > 0) {
            console.log('Validation errors:', errors)
            return false
        }

        setBooks((prevState) => {
            return [
                ...prevState,
                {
                    title: formData.title,
                    author: formData.author,
                    isbn: Math.random().toString(36).substr(2, 10),
                    status: 'Available',
                    isDeleted: false,
                    year: 2023
                }
            ]
        })
        return true
    }

    function deleteBook(isbn: string) {
        setBooks(
            books.map((b) => {
                return b.isbn === isbn ? { ...b, isDeleted: true } : b
            })
        )
    }

    function toggleStatus(isbn: string) {
        setBooks(
            books.map((b) => {
                return b.isbn === isbn ? { ...b, status: b.status === 'Available' ? 'Borrowed' : ('Available' as BookStatus) } : b
            })
        )
    }

    return (
        <>
            <h1>Welcome to Hogsworth Library!</h1>
            <BookForm addBook={addBook} />
            <BookList books={books} deleteBook={deleteBook} toggleBookStatus={toggleStatus} />
        </>
    )
}

export default Library
