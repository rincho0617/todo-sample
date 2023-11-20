import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import DraggableTodo from './TodoCard';
import { todoSlice } from './todoSlice';
import { configureStore } from '@reduxjs/toolkit';
import { TodoStatus } from '../../../common/enums';
import { categorySlice } from '../Category/categorySlice';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('DraggableTodo', () => {
    it('should render and handle drag start event', () => {
        const mockTodo = {
            id: '1',
            title: 'Test Todo',
            content: 'Test Content',
            categoryId: 'category-1',
            status: TodoStatus.pending,
            createdAt: 1,
        };

        const mockStore = configureStore({
            reducer: {
                todoStore: todoSlice.reducer,
                categoryStore: categorySlice.reducer
            },
            preloadedState: {
                todoStore: {
                    todos: [mockTodo],
                },
            },
        });

        render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <DndProvider backend={HTML5Backend}>
                        <DraggableTodo todo={mockTodo} index={0} />
                    </DndProvider>
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('opens the modal when the edit button is clicked', async () => {
        const mockTodo = {
            id: '1',
            title: 'Test Todo',
            content: 'Test Content',
            categoryId: 'category-1',
            status: TodoStatus.pending,
            createdAt: 1,
        };

        const mockStore = configureStore({
            reducer: {
                todoStore: todoSlice.reducer,
                categoryStore: categorySlice.reducer
            },
            preloadedState: {
                todoStore: {
                    todos: [mockTodo],
                },
            },
        });

        render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <DndProvider backend={HTML5Backend}>
                        <DraggableTodo todo={mockTodo} index={0} />
                    </DndProvider>
                </Provider>
            </BrowserRouter>
        );

        await userEvent.click(screen.getByAltText('編集'));

        expect(screen.getByText('タスクの更新')).toBeInTheDocument();
    });

    it('should remove todo', async () => {
        const mockTodo = {
            id: '1',
            title: 'Test Todo',
            content: 'Test Content',
            categoryId: 'category-1',
            status: TodoStatus.pending,
            createdAt: 1,
        };

        const mockStore = configureStore({
            reducer: {
                todoStore: todoSlice.reducer,
                categoryStore: categorySlice.reducer
            },
            preloadedState: {
                todoStore: {
                    todos: [mockTodo],
                },
            },
        });

        render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <DndProvider backend={HTML5Backend}>
                        <DraggableTodo todo={mockTodo} index={0} />
                    </DndProvider>
                </Provider>
            </BrowserRouter>
        );

        await userEvent.click(screen.getByAltText('削除'));

        expect(mockStore.getState().todoStore.todos).toEqual([]);
    });
});
