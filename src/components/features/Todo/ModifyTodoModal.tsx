import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import { useDispatch } from 'react-redux';
import AppInput from '../../Common/AppInput';
import { TodoItem } from '../../../common/type';
import { update } from './todoSlice';
import AppTextarea from '../../Common/AppTextarea';
import AppSelectBox from '../../Common/AppSelectBox';
import { useSelector } from 'react-redux';
import { RootState } from '../rootState';

type ModifyTodoModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (state: boolean) => void;
    todo: TodoItem;
};

export const ModifyTodoModal: React.FC<ModifyTodoModalProps> = ({
    isModalOpen,
    setIsModalOpen,
    todo,
}) => {
    const [title, setTitle] = useState(todo.title);
    const [content, setContent] = useState(todo.content);
    const [categoryId, setCategoryId] = useState<string | null>(
        todo.categoryId || null,
    );
    const dispatch = useDispatch();

    const categories = useSelector(
        (state: RootState) => state.categoryStore.categories,
    );
    const categoryKV = categories.map((category) => {
        return {
            key: category.id,
            value: category.categoryName,
        };
    });

    const updateTodo = () => {
        // id プロパティを削除することで型エラーを解消
        const id = todo.id;
        dispatch(update({ id, updatedTodo: { title, categoryId, content } }));
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {isModalOpen && (
                <Modal
                    title={'タイトルの更新'}
                    onSubmit={updateTodo}
                    onClose={closeModal}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            タイトル：
                        </label>
                        <AppInput value={title} onChange={setTitle} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            内容：
                        </label>
                        <AppTextarea value={content} onChange={setContent} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            カテゴリー：
                        </label>
                        <AppSelectBox
                            value={categoryId}
                            options={categoryKV}
                            onChange={setCategoryId}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
};
