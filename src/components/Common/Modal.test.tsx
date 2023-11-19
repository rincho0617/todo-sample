import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
    test('Modal displays correctly', () => {
        const onSubmit = jest.fn();
        const onClose = jest.fn();

        render(
            <Modal
                title="Test Modal"
                onSubmit={onSubmit}
                onClose={onClose}
            >
                <p>Modal content</p>
            </Modal>,
        );

        // モーダルが正しく表示されていることを検証
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    test('Modal calls onSubmit and onClose when submit button is clicked', () => {
        const onSubmit = jest.fn();
        const onClose = jest.fn();

        render(
            <Modal
                title="Test Modal"
                onSubmit={onSubmit}
                onClose={onClose}
            >
                <p>Modal content</p>
            </Modal>,
        );

        // 送信ボタンをクリック
        fireEvent.click(screen.getByText('送信'));

        // onSubmit と onClose が正しく呼び出されたことを検証
        expect(onSubmit).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
    });

    test('Modal calls onClose when cancel button is clicked', () => {
        const onSubmit = jest.fn();
        const onClose = jest.fn();

        render(
            <Modal
                title="Test Modal"
                onSubmit={onSubmit}
                onClose={onClose}
            >
                <p>Modal content</p>
            </Modal>,
        );

        // キャンセルボタンをクリック
        fireEvent.click(screen.getByText('キャンセル'));

        // onClose が正しく呼び出されたことを検証
        expect(onClose).toHaveBeenCalled();
    });
});
