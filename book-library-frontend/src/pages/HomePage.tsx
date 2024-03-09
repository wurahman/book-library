import React from 'react'
import Library from '../components/Library'

const HomePage = () => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Library />
        </div>
    )
}

export default HomePage
