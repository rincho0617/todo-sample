import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../components/Common/Header';
import './../tailwind.css';
import TodoDetail from '../components/features/Todo/TodoDetail';
import Presenter from '../components/features/Presenter';
function App() {
    return (
        <div className="App h-screen">
            <BrowserRouter>
                <Header />
                <Provider store={store}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Presenter />}
                        />
                        <Route
                            path="/tasks/:todo_id"
                            element={<TodoDetail />}
                        />
                    </Routes>
                </Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
