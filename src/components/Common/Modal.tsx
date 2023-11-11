import React from "react";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, children, onSubmit,onClose}) => {
    const handleSubmit = () => {
        onSubmit()
        onClose()
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative z-10 bg-white rounded-lg p-10 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
            {children}
            <button className="mt-4 bg-slate-400 text-white py-2 px-4 rounded" onClick={handleSubmit}>
                送信
            </button>
            <button className="mt-4 bg-slate-400 text-white py-2 px-4 rounded" onClick={onClose}>
            キャンセル
            </button>
        </div>
        </div>
    );
};

export default Modal;
