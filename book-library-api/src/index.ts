import app from './app'
import db from './database'

const PORT = process.env.PORT ?? 4000

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// Close the database connection on process termination
const exitHandler = (signal: any): void => {
  console.log('\n\nShutting down: Received', signal)
  db.close()
  server.close()
  process.exit(0)
}

process.on('SIGINT', exitHandler)
process.on('SIGTERM', exitHandler)
