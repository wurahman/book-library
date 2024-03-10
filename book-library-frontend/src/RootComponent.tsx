import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Library from './components/Library'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'

// import './styles/main.scss'

const RootComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
                <Route path="library" element={<Library />} />
            </Routes>
        </Router>
    )
}

export default RootComponent
