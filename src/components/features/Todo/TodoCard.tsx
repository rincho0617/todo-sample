import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { remove } from "./todoSlice";
import { TodoItem } from "../../../common/type";
import { useSelector } from "react-redux";
import { RootState } from "../rootState";

type DraggableTodoProps = {
  todo: TodoItem;
  index: number;
};

const DraggableTodo: React.FC<DraggableTodoProps> = ({ todo, index }) => {
  const categories = useSelector((state: RootState) => state.categoryStore.categories);
  const category = categories.find((category) => category.id === todo.categoryId);
  const dispatch = useDispatch();

  const removeTodo = (id: string) => {
    dispatch(remove(id));
  };

  const [, ref, preview] = useDrag({
    type: "TODO",
    item: { id: todo.id, status: todo.status, index },
  });

  return (
    <div ref={(node) => { ref(node); preview(node, { captureDraggingState: true }); }} className="flex justify-between border p-4 m-4 rounded-lg shadow-lg">
      <div>
        <div className="text-xl font-semibold">{todo.title}</div>
        <div className="text-sm text-gray-500">{todo.status}</div>
        <div className="mt-2 text-gray-700">{todo.content}</div>
        <div className="mt-4 flex space-y-2">
          <button
            type="button"
            onClick={() => removeTodo(todo.id)}
            className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded"
          >
            <img className="w-6 h-6" src="/logos/trashBox.svg" alt="削除" />
          </button>
        </div>
      </div>
      {category && (
        <div className="">
          <div className="bg-slate-400 text-white p-2 rounded">{category.categoryName}</div>
        </div>
      )}
    </div>
  );
};

export default DraggableTodo;
