import React from 'react';

type TextareaProps = {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
};

const AppTextarea: React.FC<TextareaProps> = ({
    value,
    placeholder,
    onChange,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <textarea
            className="w-full px-3 py-2 border rounded-md"
            value={value}
            placeholder={placeholder}
            rows={2}
            onChange={handleInputChange}
        />
    );
};

export default AppTextarea;
