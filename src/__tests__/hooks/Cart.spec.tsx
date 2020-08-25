import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useCart, CartProvider } from '../../hooks/cart';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Cart hook', () => {
  beforeAll(() => {
    const productsResponse = [
      {
        id: 1,
        nome: 'ARROZ PACOTE',
        valor_unitario: 10,
        quantidade: 2,
        url_imagem:
          'https://simplest-meuspedidos-arquivos.s3.amazonaws.com/media/imagens_auto/alimentos/arroz_pacote.jpg',
        sku: '123213213',
      },
      {
        id: 2,
        nome: 'COOKIES',
        valor_unitario: 5,
        quantidade: 46,
        url_imagem:
          'https://simplest-meuspedidos-arquivos.s3.amazonaws.com/media/imagens_auto/alimentos/cookies.jpg',
        sku: '123213214',
      },
    ];

    const discountRules = [
      {
        tipo: 'valor_minimo',
        valor: 200,
        desconto_percentual: 10,
      },
      {
        tipo: 'quantidade_itens_minima',
        valor: 50,
        desconto_percentual: 20,
      },
    ];
    apiMock.onGet('/carrinho/').reply(200, productsResponse);
    apiMock.onGet('/politicas-comerciais/').reply(200, discountRules);
  });

  it('should be able to load products from api', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    await waitForNextUpdate();

    expect(result.current.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          nome: 'ARROZ PACOTE',
          valor_unitario: 10,
          quantidade: 2,
          url_imagem:
            'https://simplest-meuspedidos-arquivos.s3.amazonaws.com/media/imagens_auto/alimentos/arroz_pacote.jpg',
          sku: '123213213',
        }),
      ]),
    );
  });

  it('should be able to provider cart total', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    await waitForNextUpdate();

    expect(result.current.cartTotal).toEqual(225);
  });

  it('should be able to provider cart subtotal', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    await waitForNextUpdate();

    expect(result.current.cartSubtotal).toEqual(250);
  });

  it('should be able to increment product quantity', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    await waitForNextUpdate();

    act(() => {
      result.current.increment(1);
    });

    expect(result.current.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          quantidade: 3,
        }),
      ]),
    );
  });

  it('should be able to decrement product quantity', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    await waitForNextUpdate();

    act(() => {
      result.current.decrement(1);
    });

    expect(result.current.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          quantidade: 1,
        }),
      ]),
    );
  });

  it('should be able to remove product from cart', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    await waitForNextUpdate();

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.products).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          id: 1,
          nome: 'ARROZ PACOTE',
          valor_unitario: 8.49,
          quantidade: 2,
          url_imagem:
            'https://simplest-meuspedidos-arquivos.s3.amazonaws.com/media/imagens_auto/alimentos/arroz_pacote.jpg',
          sku: '123213213',
        }),
      ]),
    );
  });

  it('should be able to add observation to a product', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    await waitForNextUpdate();

    act(() => {
      result.current.addObservation({
        id: 1,
        observacao: 'An observation to product 1',
      });
    });

    expect(result.current.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          observacao: 'An observation to product 1',
        }),
      ]),
    );
  });

  it('should be able to reset cart', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    await waitForNextUpdate();

    act(() => {
      result.current.resetCart();
    });

    expect(result.current.products).toEqual(expect.arrayContaining([]));
    expect(result.current.cartTotal).toEqual(0);
    expect(result.current.cartSubtotal).toEqual(0);
  });

  it('should be able to calculate discount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    await waitForNextUpdate();

    act(() => {
      result.current.increment(2);
    });

    expect(result.current.cartTotal).toEqual(229.5);
    expect(result.current.cartSubtotal).toEqual(255);
    expect(result.current.discountValue).toEqual(25.5);
  });
});
