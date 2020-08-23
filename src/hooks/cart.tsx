import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import api from '../services/api';

interface Product {
  sku: string;
  quantidade: number;
  nome: string;
  valor_unitario: number;
  url_imagem: string;
  id: number;
  observacao: string;
}

interface Discount {
  desconto_percentual: number;
  tipo: string;
  valor: number;
}

interface CartContextData {
  products: Product[];
  cartTotal: number;
  cartSubtotal: number;
  totalItens: number;
  discountValue: number;
  resetCart(): void;
  increment(id: number): void;
  decrement(id: number): void;
  removeFromCart(id: number): void;
  addObservation(product: { id: number; observacao: string }): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC = ({ children }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountRules, setDiscountRules] = useState<Discount[]>([]);
  const [totalItens, setTotalItens] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('/carrinho/');

      const loadedProducts = response.data.map((product: Product) => {
        const {
          sku,
          quantidade,
          nome,
          valor_unitario,
          url_imagem,
          id,
        } = product;

        return {
          sku,
          quantidade,
          nome,
          valor_unitario,
          url_imagem,
          id,
          observacao: '',
        };
      });

      setProducts(loadedProducts);
    }
    loadProducts();
  }, []);

  useEffect(() => {
    const applicableDiscounts: Discount[] = [];

    discountRules.map((discount) => {
      if (discount.tipo === 'valor_minimo') {
        if (cartSubtotal >= discount.valor) {
          applicableDiscounts.push(discount);
        }
      }

      if (discount.tipo === 'quantidade_itens_minima') {
        if (totalItens >= discount.valor) {
          applicableDiscounts.push(discount);
        }
      }

      return null;
    });

    if (applicableDiscounts.length) {
      const { desconto_percentual } =
        applicableDiscounts.length === 1
          ? applicableDiscounts[0]
          : applicableDiscounts.reduce((prev, current) => {
              if (prev) {
                return prev.desconto_percentual > current.desconto_percentual
                  ? prev
                  : current;
              }

              return current;
            });

      const discount = cartSubtotal * (desconto_percentual / 100);

      setDiscountValue(discount);
      setCartTotal(cartSubtotal - discount);
      return;
    }

    setCartTotal(cartSubtotal);
    setDiscountValue(0);
  }, [cartSubtotal, discountRules, totalItens]);

  useEffect(() => {
    async function loadDiscountRules(): Promise<void> {
      const response = await api.get('/politicas-comerciais/');

      setDiscountRules(response.data);
    }

    loadDiscountRules();
  }, []);

  useEffect(() => {
    const { total } = products.reduce(
      (accumulator, product) => {
        accumulator.total += product.quantidade;

        return accumulator;
      },
      {
        total: 0,
      },
    );

    setTotalItens(total);
  }, [products]);

  useEffect(() => {
    const { total } = products.reduce(
      (accumulator, product) => {
        const subtotal = product.quantidade * product.valor_unitario;

        accumulator.total += subtotal;

        return accumulator;
      },
      {
        total: 0,
      },
    );

    setCartSubtotal(total);
  }, [products]);

  const increment = useCallback(
    async (id) => {
      const productIndex = products.findIndex((product) => product.id === id);

      const {
        nome,
        quantidade,
        sku,
        url_imagem,
        valor_unitario,
        observacao,
      } = products[productIndex];

      const productsModified = [...products];
      const quantityModified = quantidade + 1;

      productsModified[productIndex] = {
        id,
        nome,
        sku,
        url_imagem,
        valor_unitario,
        observacao,
        quantidade: quantityModified,
      };

      setProducts(productsModified);
    },
    [products],
  );

  const decrement = useCallback(
    async (id) => {
      const productIndex = products.findIndex((product) => product.id === id);

      const {
        nome,
        quantidade,
        sku,
        url_imagem,
        observacao,
        valor_unitario,
      } = products[productIndex];

      if (quantidade === 1) {
        const productsFiltered = products.filter(
          (product) => product.id !== id,
        );

        setProducts(productsFiltered);
      } else {
        const productsModified = [...products];

        const quantityModified = quantidade - 1;

        productsModified[productIndex] = {
          id,
          nome,
          sku,
          url_imagem,
          valor_unitario,
          observacao,
          quantidade: quantityModified,
        };

        setProducts(productsModified);
      }
    },
    [products],
  );

  const removeFromCart = useCallback(
    async (id) => {
      const productsFiltered = products.filter((product) => product.id !== id);

      setProducts(productsFiltered);
    },
    [products],
  );

  const addObservation = useCallback(
    async ({ id, observacao }) => {
      const productIndex = products.findIndex((product) => product.id === id);

      const { nome, quantidade, sku, url_imagem, valor_unitario } = products[
        productIndex
      ];

      const productsModified = [...products];

      productsModified[productIndex] = {
        id,
        nome,
        sku,
        url_imagem,
        valor_unitario,
        quantidade,
        observacao,
      };

      setProducts(productsModified);
    },
    [products],
  );

  const resetCart = useCallback(() => {
    setProducts([]);
    setCartSubtotal(0);
    setCartTotal(0);
  }, []);

  const value = useMemo(
    () => ({
      products,
      cartTotal,
      cartSubtotal,
      totalItens,
      discountValue,
      increment,
      decrement,
      removeFromCart,
      addObservation,
      resetCart,
    }),
    [
      products,
      cartTotal,
      cartSubtotal,
      totalItens,
      discountValue,
      increment,
      decrement,
      removeFromCart,
      addObservation,
      resetCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
