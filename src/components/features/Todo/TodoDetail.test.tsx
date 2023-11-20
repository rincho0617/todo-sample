import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, MemoryRouter, BrowserRouter, Routes } from 'react-router-dom';
import TodoDetail from './TodoDetail';
import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './todoSlice';
import { categorySlice } from '../Category/categorySlice';
import { TodoStatus } from '../../../common/enums';

// Reduxのモックストアを作成

describe('TodoDetail', () => {
    it('renders todo details correctly', () => {
        const mockTodo = {
            id: '1',
            title: 'Test Todo',
            content: 'Test Content',
            status: TodoStatus.pending,
            categoryId: 'category-1',
            createdAt: 1
        };
        const mockStore = configureStore({
            reducer: {
                todoStore: todoSlice.reducer,
                categoryStore: categorySlice.reducer,
            },
            preloadedState: {
                todoStore: {
                    todos: [mockTodo],
                },
                categoryStore: {
                    categories: [
                        {
                            id: 'category1',
                            categoryName: 'Test category1',
                            createdAt: 1,
                        },
                        {
                            id: 'category2',
                            categoryName: 'Test category2',
                            createdAt: 2,
                        },
                    ],
                },
            },
        });

        render(
            <BrowserRouter>
                <Router>
                    <Provider store={mockStore}>
                        <TodoDetail />
                    </Provider>
                </Router>
            </BrowserRouter>
        );

        // レンダリング後のテストコード
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    // 他のテストも同様に追加
    });
});
