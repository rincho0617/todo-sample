import React from "react";
import { Category } from "../../../common/type";

type CategorySelectorProps = {
    categories: Category[],
    onChange: (value: string) => void
}
export const CategorySelector: React.FC<CategorySelectorProps> = ({categories}) => {
    return (
        <div>
            <select name="" id="">
                <option value="">---</option>
                {categories.map(category => {
                    return (
                        <option value={category.categoryName}>{category.categoryName}</option>
                    )
                })}
            </select>
        </div>
    )
}