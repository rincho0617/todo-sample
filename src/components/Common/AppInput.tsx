import React from "react";

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const AppInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      className="w-full px-3 py-2 border rounded-md text-black"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default AppInput;
