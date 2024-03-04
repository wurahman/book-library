import React from 'react'
import BookList from '../components/BookList'

const HomePage = () => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>Welcome to Hogsworth Library!</h1>
            <BookList />
        </div>
    )
}

export default HomePage
