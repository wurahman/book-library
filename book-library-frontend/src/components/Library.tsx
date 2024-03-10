import React, { useEffect, useState } from 'react'
import { Book, BookStatus } from '../types/types.js'
import BookList from './BookList'
import BookForm from './BookForm'

import { Alert, Container, Snackbar } from '@mui/material'

import '../styles/library.scss'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000'
const url = new URL('/books', BASE_URL).toString()

const loadBookData = async () => {
    const response = await fetch(url + '?limit=20')
    if (!response.ok) {
        throw new Error('API response was not ok')
    }
    return response.json()
}

const Library = () => {
    const [books, setBooks] = useState([] as Book[])
    const [showAlert, setShowAlert] = React.useState(false)
    const [serverError, setServerError] = React.useState('')

    /**
     * hard coded list of books
     */
    useEffect(() => {
        loadBookData().then(setBooks)
    }, [])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setShowAlert(false)
    }

    const addBook = async (formData: any): Promise<boolean> => {
        try {
            const response = await axios.post(url, formData)
            if (response.status === 201) {
                console.log('Book added', response)
                setServerError('Book added successfully. ' + response.statusText)
                setShowAlert(true)
                loadBookData().then(setBooks)
                return true
            } else {
                setServerError(`Server Error adding book ${response.status}, ${response.statusText}`)
                console.log(`>>>  Server Error adding book ${response.status}, ${response.statusText}`)
                setShowAlert(true)
                return false
            }
        } catch (error) {
            throw new Error('Error adding book')
        }
    }

    const deleteBook = async (id: number) => {
        try {
            const response = await axios.delete(`${url}/${id}`)
            if (response.status === 204) {
                setServerError('Book deleted successfully. ' + response.statusText)
                setShowAlert(true)
                loadBookData().then(setBooks)
            } else {
                setServerError(`Server Error adding book ${response.status}, ${response.statusText}`)
                console.log(`>>>  Server Error adding book ${response.status}, ${response.statusText}`)
                setShowAlert(true)
            }
        } catch (error) {
            throw new Error('Error adding book')
        }
    }

    const toggleStatus = async (id: number, status: BookStatus) => {
        try {
            const response = await axios.put(`${url}/${id}`, { status })
            if (response.status === 200) {
                setServerError('Book added successfully. ' + response.statusText)
                setShowAlert(true)
                loadBookData().then(setBooks)
            } else {
                setServerError(`Server Error adding book ${response.status}, ${response.statusText}`)
                console.log(`>>>  Server Error adding book ${response.status}, ${response.statusText}`)
                setShowAlert(true)
            }
        } catch (error) {
            throw new Error('Error adding book')
        }
    }

    return (
        <Container maxWidth="md" className="test">
            <h1>Welcome to Hogwarts Library!</h1>
            <BookForm addBook={addBook} />
            <BookList books={books} deleteBook={deleteBook} toggleBookStatus={toggleStatus} />
            <hr />
            {showAlert && <h4>{showAlert}</h4>}
            {serverError && <h4>{serverError}</h4>}
            <hr />

            <Snackbar open={showAlert} autoHideDuration={5000} onClose={handleClose}>
                <Alert severity="success" variant="filled" onClose={handleClose}>
                    {serverError}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Library
