import React, { useState } from "react";
import AppSelectBox from "../Common/AppSelectBox";
import TodoList from "./Todo/TodoList";
import { TodoStatus } from "../../common/enums";
import { Category, TodoItem } from "../../common/type";
import { AddCategoryModal } from "./Category/AddCategoryModal";

type PresenterProps = {
  todos: TodoItem[];
  categories: Category[];
};

const Presenter: React.FC<PresenterProps> = ({ todos, categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const categoryKV = categories.map((category) => ({
    key: category.id,
    value: category.categoryName,
  }));

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="h-[10%] bg-blue-500 text-white flex items-center justify-between p-4">
        <div className="text-2xl font-bold">Todoリスト</div>
        <div className="flex items-center space-x-4">
          <div className="cursor-pointer" onClick={openModal}>
            + カテゴリーを追加
          </div>
          <AddCategoryModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
      <div className="h-[10%] flex items-center p-4">
        <AppSelectBox
          value={selectedCategoryId}
          options={categoryKV}
          onChange={handleCategorySelect}
        />
      </div>
      <div className="flex h-[80%]">
        <div className="w-[33%] p-4 border-r">
          <h2 className="text-lg font-bold mb-4">未着手</h2>
          <TodoList
            todos={todos.filter(
              (todo) =>
                (!selectedCategoryId || todo.categoryId === selectedCategoryId) &&
                todo.status === TodoStatus.pending
            )}
            projectStatus={TodoStatus.pending}
          />
        </div>
        <div className="w-[33%] p-4 border-r">
          <h2 className="text-lg font-bold mb-4">処理中</h2>
          <TodoList
            todos={todos.filter(
              (todo) =>
                (!selectedCategoryId || todo.categoryId === selectedCategoryId) &&
                todo.status === TodoStatus.inProgress
            )}
            projectStatus={TodoStatus.inProgress}
          />
        </div>
        <div className="w-[33%] p-4">
          <h2 className="text-lg font-bold mb-4">完了</h2>
          <TodoList
            todos={todos.filter(
              (todo) =>
                (!selectedCategoryId || todo.categoryId === selectedCategoryId) &&
                todo.status === TodoStatus.completed
            )}
            projectStatus={TodoStatus.completed}
          />
        </div>
      </div>
    </div>
  );
};

export default Presenter;
