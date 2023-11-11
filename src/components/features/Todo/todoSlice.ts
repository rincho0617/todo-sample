import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoItem } from "../../../common/type";
import { TodoStatus } from "../../../common/enums";

const state: {todos: TodoItem[]} = {
    todos: [ 
        {
          id: "1",
          categoryId: "1",
          title: "テスト1",
          content: "テスト1の内容",
          status: TodoStatus.pending,
          createdAt: 1
        },
        {
          id: "2",
          categoryId: "2",
          title: "テスト2",
          content: "テスト2の内容",
          status: TodoStatus.pending,
          createdAt: 2
        },
        {
            id: "3",
            categoryId: "2",
            title: "テスト3",
            content: "テスト3の内容",
            status: TodoStatus.pending,
            createdAt: 1
        },
        {
            id: "4",
            categoryId: undefined,
            title: "テスト4",
            content: "テスト4の内容",
            status: TodoStatus.pending,
            createdAt: 3
        }

      ]
}

export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: state,
    reducers: {
        // Actionを記述
        add: (state, action: PayloadAction<TodoItem>) => {
            state.todos.push(action.payload)
        },
        remove: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        updateStatus: (state, action: PayloadAction<{id: string, newStatus: TodoStatus}>) => {
            const {id, newStatus} = action.payload
            state.todos = state.todos.map(todo => todo.id === id ? {...todo, status: newStatus} : todo)
        }
    }
})

export const {add, remove, updateStatus} = todoSlice.actions