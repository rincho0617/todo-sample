import { render, screen } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom';

test('ボタンのテスト', () => {
    render(<Button buttonName={'aaa'} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('aaa');
});