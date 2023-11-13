import React, { useState } from 'react';
import AppSelectBox from '../Common/AppSelectBox';
import TodoList from './Todo/TodoList';
import { TodoStatus } from '../../common/enums';
import { Category, TodoItem } from '../../common/type';
import { AddCategoryModal } from './Category/AddCategoryModal';

type PresenterProps = {
    todos: TodoItem[];
    categories: Category[];
};

const Presenter: React.FC<PresenterProps> = ({ todos, categories }) => {
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
        <div className="h-screen flex flex-col">
            <div className="h-[10%] bg-gray-700 text-white flex items-center justify-between">
                <div className="text-2xl font-bold ml-2">Todoリスト</div>
                <div className="flex items-center space-x-4">
                    <div
                        className="cursor-pointer mr-2"
                        onClick={openModal}
                    >
                        + カテゴリーを追加
                    </div>
                    <AddCategoryModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
            </div>
            <div className="h-[90%] bg-gray-200">
                <div className="h-[10%] w-[95%] mx-auto">
                    <div className="flex-column py-3 pl-3">
                        <div className="">カテゴリー</div>
                        <div className="w-[20%]">
                            <AppSelectBox
                                value={selectedCategoryId}
                                options={categoryKV}
                                onChange={handleCategorySelect}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex h-[90%] w-[95%] mx-auto">
                    <TodoList
                        todos={todos.filter(
                            todo =>
                                (!selectedCategoryId ||
                                    todo.categoryId === selectedCategoryId) &&
                                todo.status === TodoStatus.pending,
                        )}
                        projectStatus={TodoStatus.pending}
                    />
                    <TodoList
                        todos={todos.filter(
                            todo =>
                                (!selectedCategoryId ||
                                    todo.categoryId === selectedCategoryId) &&
                                todo.status === TodoStatus.inProgress,
                        )}
                        projectStatus={TodoStatus.inProgress}
                    />
                    <TodoList
                        todos={todos.filter(
                            todo =>
                                (!selectedCategoryId ||
                                    todo.categoryId === selectedCategoryId) &&
                                todo.status === TodoStatus.completed,
                        )}
                        projectStatus={TodoStatus.completed}
                    />
                </div>
            </div>
        </div>
    );
};

export default Presenter;
