import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AppSelectBox from './AppSelectBox';

describe('AppSelectBox', () => {
    test('AppSelectBox calls onChange when select value changes', () => {
        const handleChange = jest.fn();

        const options = [
            { key: 'option1', value: 'Option 1' },
            { key: 'option2', value: 'Option 2' },
        ];

        render(
            <AppSelectBox
                value={null}
                options={options}
                onChange={handleChange}
            />,
        );
        const selectElement = screen.getByRole('combobox');

        // ユーザーアクション（セレクトボックスの選択変更）を模倣
        fireEvent.change(selectElement, { target: { value: 'option2' } });

        // onChangeが正しく呼び出されたことを検証
        expect(handleChange).toHaveBeenCalledWith('option2');
    });

    test('AppSelectBox displays options correctly', () => {
        const handleChange = jest.fn();

        const options = [
            { key: 'option1', value: 'Option 1' },
            { key: 'option2', value: 'Option 2' },
        ];

        render(
            <AppSelectBox
                value={null}
                options={options}
                onChange={handleChange}
            />,
        );

        // オプションが正しく表示されていることを検証
        options.forEach(option => {
            const optionElement = screen.getByText(option.value);
            expect(optionElement).toBeInTheDocument();
        });
    });
});
