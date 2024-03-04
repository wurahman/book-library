import { render, screen, waitFor } from '@testing-library/react'
import DateDisplay from '../../components/DateDisplay'

test('renders current date', async () => {
    render(<DateDisplay />)
    await waitFor(() => expect(screen.getByText(/GMT/i)).toBeInTheDocument(), { timeout: 1100 });

})
