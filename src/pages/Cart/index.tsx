import React from 'react';

import { Container, Content } from './style';
import { useCart } from '../../hooks/cart';
import CartItem from '../../components/CartItem';

const Cart: React.FC = () => {
  const { products } = useCart();

  return (
    <Container>
      <h1>Carrinho</h1>
      <Content>
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
      </Content>
    </Container>
  );
};

export default Cart;
