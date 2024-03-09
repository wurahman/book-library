import { render, screen, waitFor } from '@testing-library/react'
import BookList from '../../components/BookList'

test('renders current date', async () => {
    //    render(<BookList />)
    await waitFor(() => expect(screen.getByText(/GMT/i)).toBeInTheDocument(), { timeout: 1100 })
})
