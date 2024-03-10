import '../styles/library.scss'

import { Alert, AlertColor, Container, Snackbar } from '@mui/material'
import { Book, BookStatus } from '../types/types.js'
import React, { useEffect, useState } from 'react'

import BookForm from './BookForm'
import BookList from './BookList'
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
    const [snackbarMessage, setSnackbarMessage] = React.useState('')
    const [severity, setSeverity] = React.useState('success')

    useEffect(() => {
        loadBookData().then(setBooks)
    }, [])

    const alert = (msg: string, severity: AlertColor = 'success') => {
        setSnackbarMessage(msg)
        setSeverity(severity)
        setShowAlert(true)
    }

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
                alert('Book added successfully.')
                loadBookData().then(setBooks)
                return true
            } else {
                console.log(`Server Error adding book ${response.status}, ${response.statusText}`)
                alert('Server Error adding book')
                return false
            }
        } catch (error) {
            alert('Server Error adding book', 'error')
            throw new Error('Error adding book')
        }
    }

    const deleteBook = async (id: number) => {
        try {
            const response = await axios.delete(`${url}/${id}`)
            if (response.status === 204) {
                alert('Book deleted successfully.')
                loadBookData().then(setBooks)
            } else {
                alert('Server Error deleting book', 'error')
                console.log(`Server Error deleting book ${response.status}, ${response.statusText}`)
            }
        } catch (error) {
            throw new Error('Error adding book')
        }
    }

    const toggleStatus = async (id: number, status: BookStatus) => {
        try {
            const response = await axios.put(`${url}/${id}`, { status })
            if (response.status === 200) {
                alert('Book status updated successfully.')
                loadBookData().then(setBooks)
            } else {
                alert('Server Error updating book status', 'error')
                console.log(`Server Error deleting book ${response.status}, ${response.statusText}`)
            }
        } catch (error) {
            alert('Server Error updating book status', 'error')
            throw new Error('Error adding book')
        }
    }

    return (
        <Container maxWidth="md" className="test">
            <h1>Welcome to Hogwarts Library!</h1>
            <BookForm addBook={addBook} />
            <BookList books={books} deleteBook={deleteBook} toggleBookStatus={toggleStatus} />

            <Snackbar open={showAlert} autoHideDuration={2500} onClose={handleClose}>
                <Alert severity={severity as AlertColor} variant="filled" onClose={handleClose}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Library
