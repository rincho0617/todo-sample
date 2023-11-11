import React, { useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { TodoItem } from "../../../common/type";
import DraggableTodo from "./TodoCard";
import { TodoStatus } from "../../../common/enums";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { updateStatus } from "./todoSlice";
import { AddTodoModal } from "./AddTodoModal";


type TodoListProps = {
  todos: TodoItem[];
  projectStatus: TodoStatus;
};

const TodoList: React.FC<TodoListProps> = ({
    todos,
    projectStatus,
}) => {
    const dispatch = useDispatch()
    
    const [draggedTodos, setDraggedTodos] = useState(todos)

    const [, drop] = useDrop({
        accept: "TODO",
        drop: (item: { id: string; status: TodoStatus; index: number}) => {
            handleDrop(item)
        },
    })

    const handleDrop = (item: { id: string; status: TodoStatus; index: number}) => {
        const { id } = item;
        const newTodos = [...draggedTodos];
        
        setDraggedTodos(newTodos);
        dispatch(updateStatus({ id, newStatus: projectStatus }));
      };

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

  return (
    <div className="w-full h-full border" ref={(node) => drop(node)}>
      <DndProvider backend={HTML5Backend}>
        <div className="h-[10%]">
            <div 
                onClick={openModal}
                className="pt-4 pl-2 cursor-pointer"
            >
                <span className="p-2 rounded text-white bg-gray-500">
                    +課題の追加
                </span>
            </div>
            <AddTodoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} projectStatus={projectStatus} />
        </div>
        <div className="overflow-y-auto h-[90%]">
            {todos.map((todo, index) => (
            <DraggableTodo key={todo.id} todo={todo} index={index}/>
            ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default TodoList;
