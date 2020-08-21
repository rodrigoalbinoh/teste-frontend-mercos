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
  observacao?: string;
}

interface CartContextData {
  products: Product[];
  increment(id: number): void;
  decrement(id: number): void;
  removeFromCart(id: number): void;
  addObservation(id: number, observation: string): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const loadedProducts = localStorage.getItem('@TesteMercos:products');

    if (loadedProducts) {
      return JSON.parse(loadedProducts);
    }
  });

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('/carrinho/');

      console.log(response.data);

      setProducts(response.data);
    }
    loadProducts();
  }, []);

  useEffect(() => {
    function updateLocalStorage(): void {
      localStorage.setItem('@TesteMercos:products', JSON.stringify(products));
    }

    updateLocalStorage();
  }, [products]);

  const increment = useCallback(
    async (id) => {
      const productIndex = products.findIndex((product) => product.id === id);

      const { nome, quantidade, sku, url_imagem, valor_unitario } = products[
        productIndex
      ];

      const productsModified = [...products];
      const quantityModified = quantidade + 1;

      productsModified[productIndex] = {
        id,
        nome,
        sku,
        url_imagem,
        valor_unitario,
        quantidade: quantityModified,
      };

      setProducts(productsModified);
    },
    [products],
  );

  const decrement = useCallback(
    async (id) => {
      const productIndex = products.findIndex((product) => product.id === id);

      const { nome, quantidade, sku, url_imagem, valor_unitario } = products[
        productIndex
      ];

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
    async (id, observacao) => {
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

  const value = useMemo(
    () => ({
      increment,
      decrement,
      removeFromCart,
      addObservation,
      products,
    }),
    [addObservation, decrement, increment, products, removeFromCart],
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
