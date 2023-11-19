import React from 'react';

type TextareaProps = {
    value: string;
    onChange: (value: string) => void;
};

const AppTextarea: React.FC<TextareaProps> = ({ value, onChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <textarea
            className="w-full px-3 py-2 border rounded-md"
            value={value}
            rows={2}
            onChange={handleInputChange}
        />
    );
};

export default AppTextarea;
