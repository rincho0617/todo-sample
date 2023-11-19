import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AppInput from './AppInput';

describe('AppInput', () => {
    test('AppInput renders correctly', () => {
        const { getByRole } = render(
            <AppInput
                value=""
                placeholder=""
                onChange={() => {}}
            />,
        );
        const inputElement = getByRole('textbox');

        expect(inputElement).toBeInTheDocument();
    });

    test('AppInput calls onChange when input value changes', () => {
        const handleChange = jest.fn();

        const { getByRole } = render(
            <AppInput
                value=""
                placeholder=""
                onChange={handleChange}
            />,
        );
        const inputElement = getByRole('textbox');

        fireEvent.change(inputElement, { target: { value: 'test' } });

        expect(handleChange).toHaveBeenCalledWith('test');
    });

    test('AppInput displays the correct value', () => {
        const { getByRole } = render(
            <AppInput
                value="initialValue"
                placeholder=""
                onChange={() => {}}
            />,
        );
        const inputElement = getByRole('textbox');

        expect(inputElement).toHaveValue('initialValue');
    });
});
