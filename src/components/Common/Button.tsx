import React from 'react';

// Propsの型を定義
interface ButtonProps {
  buttonName: string; // ここでbuttonの型を指定
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button>{props.buttonName}</button>
  );
}

export default Button;
