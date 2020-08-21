import React, { useMemo } from 'react';

import { useCart } from '../../hooks/cart';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Content,
  CartItems,
  CartSummary,
  CartSummaryTitle,
  CartInfo,
  Total,
  CheckoutButton,
} from './style';
import CartItem from '../../components/CartItem';

const Cart: React.FC = () => {
  const { products } = useCart();

  const totalItens = useMemo(() => {
    const { total } = products.reduce(
      (accumulator, product) => {
        accumulator.total += product.quantidade;

        return accumulator;
      },
      {
        total: 0,
      },
    );

    return total;
  }, [products]);

  const cartSubtotal = useMemo(() => {
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

    return formatValue(total);
  }, [products]);

  return (
    <Container>
      <h1>Carrinho</h1>
      <Content>
        <CartItems>
          {products.map((product) => (
            <CartItem
              key={product.id}
              id={product.id}
              nome={product.nome}
              quantidade={product.quantidade}
              sku={product.sku}
              url_imagem={product.url_imagem}
              valor_unitario={product.valor_unitario}
              observacao={product.observacao}
            />
          ))}
        </CartItems>

        <CartSummary>
          <CartSummaryTitle>Resumo do pedido</CartSummaryTitle>
          <div>
            <CartInfo>
              <div>
                <span>Itens</span>
                <strong>{totalItens}</strong>
              </div>
              <div>
                <span>Total em Produtos</span>
                <strong>{cartSubtotal}</strong>
              </div>
              <div>
                <span>Descontos</span>
                <strong>{cartSubtotal}</strong>
              </div>
            </CartInfo>
            <Total>
              <strong>Total</strong>
              <strong>{cartSubtotal}</strong>
            </Total>
            <CheckoutButton type="button">Finalizar compra</CheckoutButton>
          </div>
        </CartSummary>
      </Content>
    </Container>
  );
};

export default Cart;
