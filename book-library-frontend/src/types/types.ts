export type Book = {
    title: string
    isbn: string
    author: string
    year?: number
    cover?: string
    status: BookStatus
    isDeleted: boolean | undefined
}

export type BookStatus = 'Available' | 'Borrowed'