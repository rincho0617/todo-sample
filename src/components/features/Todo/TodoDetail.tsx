import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../rootState';

const TodoDetail = () => {
    const { todo_id } = useParams();
    const todos = useSelector((state: RootState) => state.todoStore.todos);
    const todo = todos.find(todo => todo.id === todo_id);
    const categories = useSelector(
        (state: RootState) => state.categoryStore.categories,
    );

    const category = categories.find(
        category => category.id === todo?.categoryId,
    );

    return (
        <div className="flex my-auto justify-center items-center h-[90%] flex-col">
            { todo ?
                <div className="p-6 rounded-md  bg-gray-100 shadow-lg h-[70%] w-[70%]">
                    <div className="mb-4">
                        <strong className="block text-gray-700">タイトル:</strong>
                        <div>{todo?.title}</div>
                    </div>
                    <div className="mb-4">
                        <strong className="block text-gray-700">内容:</strong>
                        <div>{todo?.content}</div>
                    </div>
                    <div className="mb-4">
                        <strong className="block text-gray-700">ステータス:</strong>
                        <div>{todo?.status}</div>
                    </div>
                    {
                        category ? 
                            <div>
                                <strong className="block text-gray-700">カテゴリー:</strong>
                                <div>{category?.categoryName}</div>
                            </div>:
                            <></>
                    }
                </div>
                :
                <div>タスクが見つかりません</div>
            }
            <Link to="/">
                <div className='mt-4 text-blue-400'>タスク一覧へ戻る</div>
            </Link>
        </div>
    );
};

export default TodoDetail;
