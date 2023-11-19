import React from 'react';

type TextInputProps = {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
};

const AppInput: React.FC<TextInputProps> = ({
    value,
    placeholder,
    onChange,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder={placeholder}
            className="w-full px-3 py-2 border rounded-md text-black"
            value={value}
            onChange={handleInputChange}
        />
    );
};

export default AppInput;
