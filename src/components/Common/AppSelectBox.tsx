// AppSelectBox.tsx
import React from 'react';

type AppSelectBoxProps = {
    value: string | null;
    options: { key: string; value: string }[];
    onChange: (value: string | null) => void;
};

const AppSelectBox: React.FC<AppSelectBoxProps> = ({
    value,
    options,
    onChange,
}) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        onChange(e.target.value);
    };

    return (
        <select
            className="w-full px-3 py-2 border rounded-md"
            value={value || ''} // value が null の場合は空文字列に設定
            onChange={handleSelectChange}
        >
            <option value="">選択してください</option>
            {options.map(option => (
                <option
                    key={option.key}
                    value={option.key}
                >
                    {option.value}
                </option>
            ))}
        </select>
    );
};

export default AppSelectBox;
