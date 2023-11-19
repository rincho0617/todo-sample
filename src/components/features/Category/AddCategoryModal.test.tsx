import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { categorySlice } from './categorySlice';  // categorySliceに合わせてインポート

import { AddCategoryModal } from './AddCategoryModal';
import { configureStore } from '@reduxjs/toolkit';

describe('AddCategoryModal', () => {
    
    it('should dispatch add action when submitting the form', async () => {
        const user = userEvent.setup();
        const mockStore = configureStore({
            reducer: {
                categoryStore: categorySlice.reducer,
            },
            preloadedState: {
                categoryStore: {
                    categories: []
                }
            }
        });
        const setIsModalOpen = jest.fn();

        render(
            <Provider store={mockStore}>
                <AddCategoryModal isModalOpen={true} setIsModalOpen={setIsModalOpen} />
            </Provider>
        );

        // カテゴリー名を入力
        await user.type(screen.getByPlaceholderText('カテゴリー名を入力'), 'Test Category');

        // 送信ボタンをクリック
        fireEvent.click(screen.getByText('送信'));

        // アクションがディスパッチされたことを確認
        expect(mockStore.getState().categoryStore.categories).toEqual([
            {
                id: expect.any(String),
                categoryName: 'Test Category',
                createdAt: expect.any(Number),
            },
        ]);

        // モーダルが閉じられたことを確認
        expect(setIsModalOpen).toHaveBeenCalledWith(false);
    });

    it('should close the modal when cancel button is clicked', () => {
        const mockStore = configureStore({
            reducer: {
                categoryStore: categorySlice.reducer,
            },
            preloadedState: {
                categoryStore: {
                    categories: []
                }
            }
        });
        const setIsModalOpen = jest.fn();

        render(
            <Provider store={mockStore}>
                <AddCategoryModal isModalOpen={true} setIsModalOpen={setIsModalOpen} />
            </Provider>
        );

        // キャンセルボタンをクリック
        fireEvent.click(screen.getByText('キャンセル'));

        // モーダルが閉じられたことを確認
        expect(setIsModalOpen).toHaveBeenCalledWith(false);
    });
});
