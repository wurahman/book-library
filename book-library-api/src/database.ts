import sqlite3 from 'sqlite3'

const db = new sqlite3.Database(':memory:')

// Create the books table
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, author TEXT, status TEXT)')

  // Insert default values
  db.exec('INSERT INTO books (title, author, status) VALUES ("The Great Gatsby", "F. Scott Fitzgerald", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("To Kill a Mockingbird", "Harper Lee", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("1984", "George Orwell", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("The Catcher in the Rye", "J.D. Salinger", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("The Grapes of Wrath", "John Steinbeck", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("Brave New World", "Aldous Huxley", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("The Sun Also Rises", "Ernest Hemingway", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("The Sound and the Fury", "William Faulkner", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("The Lord of the Rings", "J.R.R. Tolkien", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("The Hobbit", "J.R.R. Tolkien", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("The Fellowship of the Ring", "J.R.R. Tolkien", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("The Two Towers", "J.R.R. Tolkien", "available")')
  db.exec('INSERT INTO books (title, author, status) VALUES ("The Return of the King", "J.R.R. Tolkien", "available")')
})

// Export the database object
export default db
