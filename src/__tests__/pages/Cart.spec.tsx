import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import Cart from '../../pages/Cart';
import { useCart } from '../../hooks/cart';

const mockedHistoryPush = jest.fn();
const useCartMocked = mocked(useCart);

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
  addObservation: jest.fn(),
  cartTotal: 385.44,
  cartSubtotal: 481.8,
  decrement: jest.fn(),
  discountValue: 96.36,
  increment: jest.fn(),
  resetCart: jest.fn(),
  removeFromCart: jest.fn(),
  totalItens: 100,
});

describe('Cart Page', () => {
  it('should be able to go to checkout page', async () => {
    render(<Cart />);

    const { getByText } = screen;

    const buttonElement = getByText('Finalizar compra');

    fireEvent.click(buttonElement);

    expect(mockedHistoryPush).toHaveBeenCalledWith('/checkout');
  });

  it('should be able to list products on the cart', async () => {
    render(<Cart />);

    const { getByText } = screen;

    expect(getByText('ARROZ PACOTE')).toBeTruthy();
    expect(getByText('SKU: 123213213')).toBeTruthy();

    expect(getByText('COOKIES')).toBeTruthy();
    expect(getByText('SKU: 123213214')).toBeTruthy();
  });

  it('should be able to calculate cart total', async () => {
    render(<Cart />);

    const { getByText } = screen;

    expect(getByText('R$ 385,44')).toBeTruthy();
  });

  it('should be able to calculate cart subtotal', async () => {
    render(<Cart />);

    const { getByText } = screen;

    expect(getByText('R$ 481,80')).toBeTruthy();
  });

  it('should be able to calculate cart discount', async () => {
    render(<Cart />);

    const { getByText } = screen;

    expect(getByText('R$ 96,36')).toBeTruthy();
  });
});
