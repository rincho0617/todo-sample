import React, { useState } from 'react';
import AppSelectBox from '../Common/AppSelectBox';
import TodoList from './Todo/TodoList';
import { TodoStatus } from '../../common/enums';
import { AddCategoryModal } from './Category/AddCategoryModal';
import { useSelector } from 'react-redux';
import { RootState } from './rootState';

const Presenter: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todoStore.todos);
    const categories = useSelector(
        (state: RootState) => state.categoryStore.categories,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        null,
    );

    const openModal = () => {
        setIsModalOpen(true);
    };

    const categoryKV = categories.map(category => ({
        key: category.id,
        value: category.categoryName,
    }));

    const handleCategorySelect = (categoryId: string | null) => {
        setSelectedCategoryId(categoryId);
    };

    return (
        <div className="flex flex-col h-[90%]">
            <div className="h-full bg-gray-200">
                <div className="h-full w-[95%] mx-auto">
                    <div className="flex-column w-[32%] h-[15%] ml-2">
                        <div className="flex">
                            <div className="font-bold py-3">カテゴリー</div>
                            <div
                                className="cursor-pointer py-3 ml-3 text-blue-400"
                                onClick={openModal}
                            >
                                ＋カテゴリーを追加
                            </div>
                            <AddCategoryModal
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                            />
                        </div>
                        <div>
                            <AppSelectBox
                                value={selectedCategoryId}
                                options={categoryKV}
                                onChange={handleCategorySelect}
                            />
                        </div>
                    </div>
                    <div className="flex h-[85%]">
                        <TodoList
                            todos={todos.filter(
                                todo =>
                                    (!selectedCategoryId ||
                                        todo.categoryId ===
                                            selectedCategoryId) &&
                                    todo.status === TodoStatus.pending,
                            )}
                            projectStatus={TodoStatus.pending}
                        />
                        <TodoList
                            todos={todos.filter(
                                todo =>
                                    (!selectedCategoryId ||
                                        todo.categoryId ===
                                            selectedCategoryId) &&
                                    todo.status === TodoStatus.inProgress,
                            )}
                            projectStatus={TodoStatus.inProgress}
                        />
                        <TodoList
                            todos={todos.filter(
                                todo =>
                                    (!selectedCategoryId ||
                                        todo.categoryId ===
                                            selectedCategoryId) &&
                                    todo.status === TodoStatus.completed,
                            )}
                            projectStatus={TodoStatus.completed}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Presenter;
