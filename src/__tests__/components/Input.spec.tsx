import React from 'react';
import { useField } from '@unform/core';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Input from '../../components/Input';

const useFieldMocked = mocked(useField);

jest.mock('@unform/core', () => ({
  __esModule: true,
  useField: jest.fn().mockReturnValue({
    fieldName: '',
    defaultValue: '',
    error: '',
    registerField: jest.fn(),
  }),
}));

describe('Input Component', () => {
  it('should  able to render an input', () => {
    useFieldMocked.mockReturnValue({
      fieldName: 'street',
      defaultValue: '',
      error: '',
      registerField: jest.fn(),
      clearError: jest.fn(),
    });

    const { getByPlaceholderText } = render(
      <Input name="street" placeholder="Rua" />,
    );

    expect(getByPlaceholderText('Rua')).toBeTruthy();
  });

  it('it should render highlight on input focus', async () => {
    useFieldMocked.mockReturnValue({
      fieldName: 'street',
      defaultValue: '',
      error: '',
      registerField: jest.fn(),
      clearError: jest.fn(),
    });

    const { getByPlaceholderText, getByTestId } = render(
      <Input name="street" placeholder="Rua" />,
    );

    const inputElement = getByPlaceholderText('Rua');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #e53935');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color: #e53935');
    });
  });

  it('it should keep input border highlight when input is errored', async () => {
    useFieldMocked.mockReturnValue({
      fieldName: 'street',
      defaultValue: '',
      error: 'Rua é um campo obrigatório',
      registerField: jest.fn(),
      clearError: jest.fn(),
    });

    const { getByTestId } = render(<Input name="street" placeholder="Rua" />);

    const containerElement = getByTestId('input-container');

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #e53935');
    });
  });

  it('it should render the input error when errored', async () => {
    useFieldMocked.mockReturnValue({
      fieldName: 'street',
      defaultValue: '',
      error: 'Rua é um campo obrigatório',
      registerField: jest.fn(),
      clearError: jest.fn(),
    });

    const { getByText } = render(<Input name="street" placeholder="Rua" />);

    await waitFor(() => {
      expect(getByText('Rua é um campo obrigatório')).toBeTruthy();
    });
  });

  it('it should render the input label when provided', async () => {
    useFieldMocked.mockReturnValue({
      fieldName: 'street',
      defaultValue: '',
      error: '',
      registerField: jest.fn(),
      clearError: jest.fn(),
    });

    const { getByTestId } = render(
      <Input name="street" placeholder="Rua" label="Rua" />,
    );

    await waitFor(() => {
      expect(getByTestId('input-label')).toBeTruthy();
    });
  });
});
