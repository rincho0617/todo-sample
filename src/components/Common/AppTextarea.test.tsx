import { fireEvent, render, screen } from '@testing-library/react';
import AppTextarea from './AppTextarea';

describe('AppTextarea', () => {
    test('AppTextarea displays correctly', () => {
        const handleChange = jest.fn();

        render(
            <AppTextarea
                value=""
                placeholder=""
                onChange={handleChange}
            />,
        );
        const element = screen.getByRole('textbox');
        expect(element).toBeInTheDocument();
    });

    test('AppTextarea calls onChange when value changes', () => {
        const handleChange = jest.fn();

        render(
            <AppTextarea
                value=""
                placeholder=""
                onChange={handleChange}
            />,
        );
        const textareaElement = screen.getByRole('textbox');

        // ユーザーアクション（テキストエリアの値の変更）を模倣
        fireEvent.change(textareaElement, { target: { value: 'New Value' } });

        // onChangeが正しく呼び出されたことを検証
        expect(handleChange).toHaveBeenCalledWith('New Value');
    });
});
