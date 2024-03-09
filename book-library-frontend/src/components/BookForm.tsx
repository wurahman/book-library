import React, { SyntheticEvent, useState } from 'react'

interface BookFormData {
    title: string
    author: string
}

interface BookFormProps {
    addBook: (formData: BookFormData) => boolean
}

const BookForm: React.FC<BookFormProps> = ({ addBook }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: ''
    } as BookFormData)

    const [errors, setErrors] = useState({})

    console.log('BookForm component rendered')

    const handleChange = (event: SyntheticEvent) => {
        const { name, value } = event.target as HTMLInputElement
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (event: SyntheticEvent) => {
        console.log('Submitting form...')
        event.preventDefault()

        // Validate that the form data is not empty
        if (formData.title === '' || formData.author === '') {
            console.log('Form data is empty')
            return
        }

        if (addBook(formData)) {
            setFormData({ title: '', author: '' })
        } else {
            console.log('Server Error adding book')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a new book</h2>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} placeholder="Enter book's title" required />
            </div>
            <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" name="author" id="author" value={formData.author} onChange={handleChange} placeholder="Enter book's author" required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    )
}

export default BookForm
