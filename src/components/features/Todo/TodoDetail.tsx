// TodoDetail.js

import { useParams } from 'react-router-dom';

const TodoDetail = () => {
    const { todo_id } = useParams();

    return (
        <div>
            <h2>Todo Detail Page</h2>
            <p>Todo ID: {todo_id}</p>
            {/* Todoの詳細情報を表示するコンポーネントを追加 */}
        </div>
    );
};

export default TodoDetail;
