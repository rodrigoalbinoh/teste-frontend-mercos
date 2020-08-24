import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import MockAdapter from 'axios-mock-adapter';

import { act } from 'react-test-renderer';
import api from '../../services/api';

import Checkout from '../../pages/Checkout';
import { useCart } from '../../hooks/cart';

const mockedHistoryPush = jest.fn();
const useCartMocked = mocked(useCart);
const mockedAddToast = jest.fn();
const apiMock = new MockAdapter(api);

jest.mock('../../hooks/cart.tsx', () => ({
  __esModule: true,
  useCart: jest.fn().mockReturnValue({
    products: [],
    totalItens: 0,
    cartSubtotal: 0,
    discountValue: 0,
    cartTotal: 0,
    increment: jest.fn(),
    decrement: jest.fn(),
    addObservation: jest.fn(),
    removeFromCart: jest.fn(),
    resetCart: jest.fn(),
  }),
}));

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

useCartMocked.mockReturnValue({
  products: [
    {
      sku: '123213213',
      quantidade: 20,
      nome: 'ARROZ PACOTE',
      valor_unitario: 8.49,
      url_imagem:
        'https://simplest-meuspedidos-arquivos.s3.amazonaws.com/media/imagens_auto/alimentos/arroz_pacote.jpg',
      id: 1,
      observacao: '',
    },
    {
      sku: '123213214',
      quantidade: 80,
      nome: 'COOKIES',
      valor_unitario: 3.9,
      url_imagem:
        'https://simplest-meuspedidos-arquivos.s3.amazonaws.com/media/imagens_auto/alimentos/cookies.jpg',
      id: 2,
      observacao: '',
    },
  ],
  totalItens: 100,
  cartSubtotal: 481.8,
  discountValue: 96.36,
  cartTotal: 385.44,
  increment: jest.fn(),
  decrement: jest.fn(),
  removeFromCart: jest.fn(),
  addObservation: jest.fn(),
  resetCart: jest.fn(),
});

describe('Checkout Page', () => {
  it('should be able to show cart total', async () => {
    act(() => {
      render(<Checkout />);
    });

    const { getByText } = screen;

    expect(getByText('R$ 385,44')).toBeTruthy();
  });

  it('should be able to purchase', async () => {
    render(<Checkout />);

    apiMock.onPost('/carrinho/').reply(200);

    const { getByPlaceholderText, getByText, getByTestId } = screen;

    const streetField = getByPlaceholderText('Rua');
    const numberField = getByPlaceholderText('Número');
    const neighborhoodField = getByPlaceholderText('Bairro');
    const cardNumberField = getByTestId('card-number');
    const cardCvcField = getByTestId('card-cvc');
    const purchaseButton = getByText('Pagar');

    fireEvent.change(streetField, {
      target: {
        value: 'Rua João Colin',
      },
    });

    fireEvent.change(numberField, {
      target: {
        value: '1200',
      },
    });

    fireEvent.change(neighborhoodField, {
      target: {
        value: 'América',
      },
    });

    fireEvent.change(cardNumberField, {
      target: {
        value: '4567 4568 8521 5236',
      },
    });

    fireEvent.change(cardCvcField, {
      target: {
        value: '753',
      },
    });

    fireEvent.click(purchaseButton);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should display an error if purchase fails', async () => {
    render(<Checkout />);

    apiMock.onPost('/carrinho/').reply(500);

    const { getByPlaceholderText, getByText, getByTestId } = screen;

    const streetField = getByPlaceholderText('Rua');
    const numberField = getByPlaceholderText('Número');
    const neighborhoodField = getByPlaceholderText('Bairro');
    const cardNumberField = getByTestId('card-number');
    const cardCvcField = getByTestId('card-cvc');
    const purchaseButton = getByText('Pagar');

    fireEvent.change(streetField, {
      target: {
        value: 'Rua João Colin',
      },
    });

    fireEvent.change(numberField, {
      target: {
        value: '1200',
      },
    });

    fireEvent.change(neighborhoodField, {
      target: {
        value: 'América',
      },
    });

    fireEvent.change(cardNumberField, {
      target: {
        value: '4567 4568 8521 5236',
      },
    });

    fireEvent.change(cardCvcField, {
      target: {
        value: '753',
      },
    });

    fireEvent.click(purchaseButton);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
