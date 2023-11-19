import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <div className="h-[10%] bg-gray-700 text-white flex items-center justify-between px-4">
            <Link to="/">
                <div className="text-2xl font-bold">Todo App</div>
            </Link>
        </div>
    );
};
