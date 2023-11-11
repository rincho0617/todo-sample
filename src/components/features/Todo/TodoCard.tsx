import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { remove } from "./todoSlice";
import { TodoItem } from "../../../common/type";
import { useSelector } from "react-redux";
import { RootState } from "../rootState";
import { ModifyTodoModal } from "./ModifyTodoModal";

type DraggableTodoProps = {
  todo: TodoItem;
  index: number;
};

const DraggableTodo: React.FC<DraggableTodoProps> = ({ todo, index }) => {
  const categories = useSelector((state: RootState) => state.categoryStore.categories);
  const category = categories.find((category) => category.id === todo.categoryId);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const removeTodo = (id: string) => {
    dispatch(remove(id));
  };

  const [, ref, preview] = useDrag({
    type: "TODO",
    item: { id: todo.id, status: todo.status, index },
  });

  return (
    <div className="h-[30%]">
        <div ref={(node) => { ref(node); preview(node, { captureDraggingState: true }); }} className="flex h-full justify-between border p-4 m-4 rounded-lg shadow-lg">
            <div className="h-full w-full">
                <div className="flex items-center h-[30%] justify-between">
                    <div className="text-xl font-semibold">{todo.title}</div>
                    {category && (
                        <div className="bg-slate-400 text-sm text-white p-1 rounded">
                        {category.categoryName}
                        </div>
                    )}
                </div>
                <div className="flex items-center">
                    <button
                        type="button"
                        className=""
                        onClick={openModal}>
                        <img
                            className="w-4 h-4"
                            src="/logos/editIcon.svg" 
                            alt="編集" 
                            />
                    </button>
                    <button
                        type="button"
                        onClick={() => removeTodo(todo.id)}
                        className="ml-2"
                        >
                        <img className="w-4 h-4" src="/logos/trashBox.svg" alt="削除" />
                    </button>
                </div>
                <div className="h-[70%] overflow-hidden">
                    <div className="pt-2 text-gray-700 whitespace-pre-line">{todo.content}</div>
                </div>
            </div>
        </div>
        <ModifyTodoModal 
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            todo={todo}
        />
    </div>
  );
};

export default DraggableTodo;
