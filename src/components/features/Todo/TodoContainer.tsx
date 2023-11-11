import { useSelector } from "react-redux"
import { RootState } from "../rootState"
import Presenter from "../Presenter"

export const TodoContainer = () => {
    
    const todos = useSelector((state: RootState) => state.todoStore.todos)
    const categories = useSelector((state: RootState) => state.categoryStore.categories)
    
    return <Presenter todos={todos} categories={categories} />
}