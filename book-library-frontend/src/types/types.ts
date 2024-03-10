export type Book = {
    id: number
    title: string
    author: string
    isbn?: string
    year?: number
    cover?: string
    status?: BookStatus
    isDeleted: boolean | undefined
}

export type BookStatus = 'available' | 'borrowed'
