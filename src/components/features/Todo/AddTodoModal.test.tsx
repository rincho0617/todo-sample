import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { todoSlice } from './todoSlice';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AddTodoModal } from './AddTodoModal';
import { TodoStatus } from '../../../common/enums';
import { categorySlice } from '../Category/categorySlice';

describe('AddTodoModal', () => {
    it('should be dispatch add action when submitting the form', async () => {
        const user = userEvent.setup();
        const mockStore = configureStore({
            reducer: {
                todoStore: todoSlice.reducer,
                categoryStore: categorySlice.reducer
            },
            preloadedState: {
                todoStore: {
                    todos: []
                },
                categoryStore: {
                    categories: [
                        {
                            id: 'xxxx',
                            categoryName: 'Test category1',
                            createdAt: 1
                        },
                        {
                            id: '2',
                            categoryName: 'Test category2',
                            createdAt: 2
                        }
                    ]
                }
            }
        });

        const setIsModalOpen = jest.fn();

        render(
            <Provider store={mockStore}>
                <AddTodoModal 
                    isModalOpen={true}
                    setIsModalOpen={setIsModalOpen}
                    projectStatus={TodoStatus.pending}
                />
            </Provider>
        );

        await user.type(screen.getByPlaceholderText('タイトルを入力'), 'Test Title');

        await user.type(screen.getByPlaceholderText('内容を入力'), 'Test Content');

        await user.selectOptions(screen.getByRole('combobox'), ['xxxx']);

        fireEvent.click(screen.getByText('送信'));

        expect(mockStore.getState().todoStore.todos).toEqual([
            {
                id: expect.any(String),
                categoryId: 'xxxx',
                title: 'Test Title',
                content: 'Test Content',
                status: TodoStatus.pending,
                createdAt: expect.any(Number),
            }
        ]);
    });
});