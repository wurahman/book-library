import React from 'react'
import Library from '../components/Library'
import CssBaseline from '@mui/material/CssBaseline'

const HomePage = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Library />
            </main>
        </React.Fragment>
    )
}

export default HomePage
