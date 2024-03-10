import '../styles/library.scss'

import { Alert, AlertColor, Button, Container, Dialog, DialogActions, DialogContent, Fab, Snackbar, Toolbar } from '@mui/material'
import { Book, BookStatus } from '../types/types.js'
import React, { useEffect, useState } from 'react'

import { Add as AddIcon } from '@mui/icons-material'
import BookForm from './BookForm'
import BookList from './BookList'
import axios from 'axios'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000'
const url = new URL('/books', BASE_URL).toString()

// eslint-disable-next-line @typescript-eslint/ban-types
const AddDialog = ({ open, setOpen, addBook }: { open: boolean; setOpen: Function; addBook: (formData: BookForm) => Promise<boolean> }) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogContent>
                    <BookForm addBook={addBook} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Library = () => {
    const [books, setBooks] = useState([] as Book[])
    const [showAlert, setShowAlert] = React.useState(false)
    const [snackbarMessage, setSnackbarMessage] = React.useState('')
    const [severity, setSeverity] = React.useState('success')
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        loadBookData().then(setBooks)
    }, [])

    const loadBookData = async () => {
        try {
            const response = await fetch(url + '?limit=20')
            if (!response.ok) {
                throw new Error('API response was not ok')
            }
            return response.json()
        } catch (error) {
            alert('Error fetching book list from api', 'error')
            console.error('Error fetching book data', error)
            return []
        }
    }

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

            <BookList books={books} deleteBook={deleteBook} toggleBookStatus={toggleStatus} />

            <AddDialog open={open} addBook={addBook} setOpen={setOpen} />
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Fab sx={{ marginLeft: 'auto' }} size="small" color="primary" aria-label="add" onClick={() => setOpen(true)}>
                    <AddIcon />
                </Fab>
            </Toolbar>
            <Snackbar open={showAlert} autoHideDuration={2500} onClose={handleClose}>
                <Alert severity={severity as AlertColor} variant="filled" onClose={handleClose}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Library
