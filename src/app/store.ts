import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "../components/features/Todo/todoSlice";
import { categorySlice } from "../components/features/Category/categorySlice";

export const store = configureStore({
    reducer: {
        todoStore: todoSlice.reducer,
        categoryStore: categorySlice.reducer
    }
})