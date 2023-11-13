import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category } from '../../../common/type';

const state: {categories: Category[]} = {
    categories: [
        {
            id: '1',
            categoryName: 'マーケティング',
            createdAt: 1
        },
        {
            id: '2',
            categoryName: 'エンジニアリング',
            createdAt: 1
        },
    ]
};

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: state,
    reducers: {
        add: (state, action: PayloadAction<Category>) => {
            const existingCategory = state.categories.find(category => category.categoryName === action.payload.categoryName);
            if (!existingCategory) {
                state.categories.push(action.payload);
            } else {
                // 同じ名前のカテゴリーが存在する場合の処理（エラー表示や何かしらの対応）
                const message = `カテゴリー "${action.payload.categoryName}" は既に存在しています。`;
                window.alert(message);
            }
        },
        remove: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
        },
    }
});

export const { add, remove } = categorySlice.actions;