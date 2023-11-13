import React, { useState } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { TodoItem } from '../../../common/type';
import DraggableTodo from './TodoCard';
import { TodoStatus } from '../../../common/enums';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { updateStatus } from './todoSlice';
import { AddTodoModal } from './AddTodoModal';

type TodoListProps = {
    todos: TodoItem[];
    projectStatus: TodoStatus;
};

const TodoList: React.FC<TodoListProps> = ({ todos, projectStatus }) => {
    const dispatch = useDispatch();

    const [draggedTodos, setDraggedTodos] = useState(todos);

    const [, drop] = useDrop({
        accept: 'TODO',
        drop: (item: { id: string; status: TodoStatus; index: number }) => {
            handleDrop(item);
        },
    });

    const handleDrop = (item: {
        id: string;
        status: TodoStatus;
        index: number;
    }) => {
        const { id } = item;
        const newTodos = [...draggedTodos];

        setDraggedTodos(newTodos);
        dispatch(updateStatus({ id, newStatus: projectStatus }));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div
            className="w-full h-full justify-center"
            ref={(node) => drop(node)}
        >
            <div className="h-[10%]">
                <div></div>
                <div className="flex w-[95%] px-2 pt-8 items-center border-b">
                    <div className="ml-2 font-bold text-lg">
                        {projectStatus}
                    </div>
                    <div className="ml-3 border rounded-full px-2 bg-gray-400">
                        <span className="">{todos.length}</span>
                    </div>
                </div>

                <AddTodoModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    projectStatus={projectStatus}
                />
            </div>
            <div className="h-[90%] flex justify-center">
                <DndProvider backend={HTML5Backend}>
                    <div className="w-[95%] border h-[95%] rounded bg-white">
                        <div className="h-[10%] flex ">
                            <span
                                onClick={openModal}
                                className="m-4 rounded text-sm cursor-pointer hover:text-gray-400"
                            >
                                + 課題の追加...
                            </span>
                        </div>
                        <div className="h-[90%] overflow-y-auto">
                            {todos.map((todo, index) => (
                                <DraggableTodo
                                    key={todo.id}
                                    todo={todo}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </DndProvider>
            </div>
        </div>
    );
};

export default TodoList;
