import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './app/App'; // あなたのアプリケーションのエントリーポイント
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoDetail from './components/features/Todo/TodoDetail';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/tasks/:todo_id" Component={TodoDetail}></Route>
            </Routes>
        </DndProvider>,
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
