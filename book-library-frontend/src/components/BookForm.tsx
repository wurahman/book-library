import '../styles/library.scss'

import { Button, Paper, Stack, TextField } from '@mui/material'
import React, { SyntheticEvent, useState } from 'react'

type BookForm = {
    title: string
    author: string
}

type ErrorData = {
    [key in keyof BookForm]?: string
}

interface BookFormProps {
    addBook: (formData: BookForm) => Promise<boolean>
}

const BookForm: React.FC<BookFormProps> = ({ addBook }) => {
    const [errors, setErrors] = useState({} as ErrorData)
    const [formData, setFormData] = useState({
        title: '',
        author: ''
    })

    const handleChange = (event: SyntheticEvent) => {
        const { name, value } = event.target as HTMLInputElement
        setFormData((prevState) => ({ ...prevState, [name]: value }))
        setErrors((prevState) => ({ ...prevState, [name]: '' }))
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()

        // Validate form fields
        if (formData.title === '') {
            setErrors((prevState) => ({ ...prevState, title: 'Title cannot be empty' }))
        }
        if (formData.author === '') {
            setErrors((prevState) => ({ ...prevState, author: 'Author cannot be empty' }))
        }

        try {
            const response = await addBook(formData)
            if (response) {
                setFormData({ title: '', author: '' })
                setErrors({})
            } else {
                console.log('Server Error adding book')
            }
        } catch (error) {
            console.log('Server Error adding book')
        }
    }

    return (
        <Paper className="form-container" elevation={6}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={1} alignItems="center">
                    <h2>Add a new book</h2>
                    <TextField
                        id="title"
                        name="title"
                        label="Title"
                        variant="outlined"
                        size="small"
                        value={formData.title}
                        onChange={handleChange}
                        {...(errors && errors.title ? { error: true, helperText: errors.title } : {})}
                    />
                    <TextField
                        id="author"
                        name="author"
                        label="Author"
                        variant="outlined"
                        size="small"
                        value={formData.author}
                        onChange={handleChange}
                        {...(errors && errors.author ? { error: true, helperText: errors.author } : {})}
                    />
                    <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'stretch' }}>
                        <Button variant="contained" type="submit">
                            Add Book
                        </Button>
                        <Button
                            variant="text"
                            type="reset"
                            onClick={() => {
                                setFormData({ title: '', author: '' })
                                setErrors({})
                            }}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Paper>
    )
}

export default BookForm
