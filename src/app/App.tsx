import { Provider } from 'react-redux';
import { store } from './store';
import { TodoContainer } from '../components/features/Todo/TodoContainer';
import './../tailwind.css';
function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <TodoContainer />
            </Provider>
        </div>
    );
}

export default App;
