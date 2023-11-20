import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { ModifyTodoModal } from './ModifyTodoModal';
import { todoSlice } from './todoSlice';
import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from '../Category/categorySlice';
import { TodoItem } from '../../../common/type';
import { TodoStatus } from '../../../common/enums';
import { BrowserRouter } from 'react-router-dom';

describe('ModifyTodoModal', () => {
    
    it('should update todo when submitting the form', async () => {
        const mockTodo: TodoItem = {
            id: '1',
            title: 'Test Title',
            content: 'Test Content',
            categoryId: 'category1',
            status: TodoStatus.pending,
            createdAt: 1
        };
        const setIsModalOpen = jest.fn();
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
                <Provider store={mockStore}>
                    <ModifyTodoModal
                        isModalOpen={true}
                        setIsModalOpen={setIsModalOpen}
                        todo={mockStore.getState().todoStore.todos[0]}
                    />
                </Provider>
            </BrowserRouter>
        );

        // タイトルを変更
        await userEvent.clear(screen.getByDisplayValue('Test Title'));
        await userEvent.type(screen.getByDisplayValue(''), 'Updated Title');
        
        // 内容を変更
        await userEvent.clear(screen.getByDisplayValue('Test Content'));
        await userEvent.type(screen.getByDisplayValue(''), 'Updated Content');
        
        // カテゴリーを変更
        await userEvent.selectOptions(screen.getByRole('combobox'), ['category2']);


        // 送信ボタンをクリック
        fireEvent.click(screen.getByText('送信'));

        // アクションがディスパッチされたことを確認
        expect(mockStore.getState().todoStore.todos).toEqual([
            {
                id: '1',
                title: 'Updated Title',
                content: 'Updated Content',
                categoryId: 'category2',
                status: TodoStatus.pending,
                createdAt: 1
            }
        ]);

        // モーダルが閉じられたことを確認
        expect(setIsModalOpen).toHaveBeenCalledWith(false);
    });

    it('should go to the page of todo detail', () => {
        const mockTodo: TodoItem = {
            id: '1',
            title: '',
            content: '',
            categoryId: '',
            status: TodoStatus.pending,
            createdAt: 1
        };
        const setIsModalOpen = jest.fn();
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
                <Provider store={mockStore}>
                    <ModifyTodoModal
                        isModalOpen={true}
                        setIsModalOpen={setIsModalOpen}
                        todo={mockStore.getState().todoStore.todos[0]}
                    />
                </Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('このタスクに移動する'));

        expect(window.location.pathname).toBe('/tasks/1');
    });
});
