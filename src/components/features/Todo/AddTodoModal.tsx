import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import AppInput from '../../Common/AppInput';
import AppTextarea from '../../Common/AppTextarea';
import { useDispatch } from 'react-redux';
import { TodoItem } from '../../../common/type';
import { TodoStatus } from '../../../common/enums';
import { add } from './todoSlice';
import { generateUUID } from '../../../utils/GenerateId';
import { useSelector } from 'react-redux';
import { RootState } from '../rootState';
import AppSelectBox from '../../Common/AppSelectBox';

type AddTodoModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (state: boolean) => void;
    projectStatus: TodoStatus;
};

export const AddTodoModal: React.FC<AddTodoModalProps> = ({
    isModalOpen,
    setIsModalOpen,
    projectStatus,
}) => {
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
    const addTodo = (
        title: string,
        content: string,
        categoryId: string | null,
    ) => {
        const newTodo: TodoItem = {
            id: generateUUID(),
            categoryId: categoryId,
            title: title,
            content: content,
            status: projectStatus,
            createdAt: new Date().getTime(),
        };
        dispatch(add(newTodo));
    };

    const sendTodo = (
        title: string,
        content: string,
        categoryId: string | null,
    ) => {
        addTodo(title, content, categoryId);
        setTitle('');
        setContent('');
    };

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {isModalOpen && (
                <Modal
                    title={'新規追加'}
                    onSubmit={() => sendTodo(title, content, categoryId)}
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
