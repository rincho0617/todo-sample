import { useDispatch } from 'react-redux';
import { Category } from '../../../common/type';
import { generateUUID } from '../../../utils/GenerateId';
import { add } from './categorySlice';
import { useState } from 'react';
import AppInput from '../../Common/AppInput';
import Modal from '../../Common/Modal';

type AddCategoryModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (state: boolean) => void;
};

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
    isModalOpen,
    setIsModalOpen,
}) => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const addCategory = (categoryName: string) => {
        const newCategory: Category = {
            id: generateUUID(),
            categoryName: categoryName,
            createdAt: new Date().getTime(),
        };
        dispatch(add(newCategory));
    };

    const submitCategory = (categoryName: string) => {
        addCategory(categoryName);
        setTitle('');
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {isModalOpen && (
                <Modal
                    title={'新規追加'}
                    onSubmit={() => submitCategory(title)}
                    onClose={closeModal}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            カテゴリー名：
                        </label>
                        <AppInput
                            value={title}
                            onChange={setTitle}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
};
