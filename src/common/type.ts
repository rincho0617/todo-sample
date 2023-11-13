import { TodoStatus } from './enums';

export type TodoItem = {
    id: string,
    categoryId?: string | null,
    title: string,
    content: string,
    status: TodoStatus
    createdAt: number
}

export type Category = {
    id: string,
    categoryName: string
    createdAt: number
}