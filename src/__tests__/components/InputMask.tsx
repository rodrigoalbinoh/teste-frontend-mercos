import React from 'react';
import { useField } from '@unform/core';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import InputMask from '../../components/InputMask';

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
  it('should able to render an input', () => {
    useFieldMocked.mockReturnValue({
      fieldName: 'cvc',
      defaultValue: '',
      error: '',
      registerField: jest.fn(),
      clearError: jest.fn(),
    });

    const { getByTestId } = render(
      <InputMask name="cvc" label="CVC" mask="999" />,
    );

    expect(getByTestId('input')).toBeTruthy();
  });

  it('it should render highlight on input focus', async () => {
    useFieldMocked.mockReturnValue({
      fieldName: 'cvc',
      defaultValue: '',
      error: '',
      registerField: jest.fn(),
      clearError: jest.fn(),
    });

    const { getByTestId } = render(
      <InputMask name="cvc" label="CVC" mask="999" />,
    );

    const inputElement = getByTestId('input');
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
      fieldName: 'cvc',
      defaultValue: '',
      error: 'CVC é um campo obrigatório',
      registerField: jest.fn(),
      clearError: jest.fn(),
    });

    const { getByTestId } = render(
      <InputMask name="cvc" label="CVC" mask="999" />,
    );

    const containerElement = getByTestId('input-container');

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #e53935');
    });
  });

  it('it should render the input error when errored', async () => {
    useFieldMocked.mockReturnValue({
      fieldName: 'cvc',
      defaultValue: '',
      error: 'CVC é um campo obrigatório',
      registerField: jest.fn(),
      clearError: jest.fn(),
    });

    const { getByText } = render(
      <InputMask name="cvc" label="CVC" mask="999" />,
    );

    await waitFor(() => {
      expect(getByText('CVC é um campo obrigatório')).toBeTruthy();
    });
  });

  it('it should render the input label when provided', async () => {
    useFieldMocked.mockReturnValue({
      fieldName: 'cvc',
      defaultValue: '',
      error: '',
      registerField: jest.fn(),
      clearError: jest.fn(),
    });

    const { getByTestId } = render(
      <InputMask name="cvc" label="CVC" mask="999" />,
    );

    await waitFor(() => {
      expect(getByTestId('input-label')).toBeTruthy();
    });
  });
});
