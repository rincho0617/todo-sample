import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TodoItem } from '../../../common/type';
import { TodoStatus } from '../../../common/enums';

const state: { todos: TodoItem[] } = {
    todos: [
        {
            id: '1',
            categoryId: '1',
            title: '市場調査',
            content: '関西圏の顧客動向を資料にまとめる',
            status: TodoStatus.pending,
            createdAt: 1,
        },
        {
            id: '2',
            categoryId: '2',
            title: 'Reactの調査をする',
            content: 'stateとreducerについて調べる',
            status: TodoStatus.pending,
            createdAt: 2,
        },
        {
            id: '3',
            categoryId: '2',
            title: 'PCの環境構築をする',
            content: '・macを最新にする\n・dockerをinstallする',
            status: TodoStatus.inProgress,
            createdAt: 1,
        },
        {
            id: '4',
            categoryId: undefined,
            title: 'ランニングをする',
            content: '10km走る',
            status: TodoStatus.pending,
            createdAt: 3,
        },
    ],
};

export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: state,
    reducers: {
        // Actionを記述
        add: (state, action: PayloadAction<TodoItem>) => {
            state.todos.push(action.payload);
        },
        remove: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(
                todo => todo.id !== action.payload,
            );
        },
        updateStatus: (
            state,
            action: PayloadAction<{ id: string; newStatus: TodoStatus }>,
        ) => {
            const { id, newStatus } = action.payload;
            state.todos = state.todos.map(todo =>
                todo.id === id ? { ...todo, status: newStatus } : todo,
            );
        },
        update: (
            state,
            action: PayloadAction<{
                id: string;
                updatedTodo: Partial<TodoItem>;
            }>,
        ) => {
            const { id, updatedTodo } = action.payload;
            state.todos = state.todos.map(todo =>
                todo.id === id ? { ...todo, ...updatedTodo } : todo,
            );
        },
    },
});

export const { add, remove, updateStatus, update } = todoSlice.actions;
