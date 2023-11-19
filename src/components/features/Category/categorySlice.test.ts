// 例: カテゴリーを追加するReducerのテスト
import { Category } from '../../../common/type';
import reducer, { add } from './categorySlice';

describe('categoryReducer', () => {
    it('should handle adding a category', () => {
        const initialState ={
            categories:[]

        };
        const newCategory: Category = {
            id: '1',
            categoryName: 'test2',
            createdAt: 1
        };
        const action = { type: add.type, payload: newCategory };
        const state = reducer(initialState, action);
        expect(state.categories).toEqual([{
            id: '1',
            categoryName: 'test2',
            createdAt: 1
        }]);
    });
});
