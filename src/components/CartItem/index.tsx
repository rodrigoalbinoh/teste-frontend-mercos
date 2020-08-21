import React from 'react';
import { ChatBubbleOutline, Remove, Add, Delete } from '@material-ui/icons';

import { useCart } from '../../hooks/cart';
import formatValue from '../../utils/formatValue';

import {
  Container,
  ProductImage,
  ProductInfo,
  QuantityContainer,
  TotalDeleteContainer,
} from './styles';

interface CartItemProps {
  id: number;
  sku: string;
  nome: string;
  quantidade: number;
  valor_unitario: number;
  url_imagem: string;
  observacao?: string;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  sku,
  nome,
  quantidade,
  valor_unitario,
  url_imagem,
  observacao,
}) => {
  const { increment, decrement, removeFromCart } = useCart();

  const cartTotal = formatValue(quantidade * valor_unitario);

  return (
    <Container>
      <ProductImage src={url_imagem} alt={nome} />
      <ProductInfo>
        <strong>{nome}</strong>
        <span>SKU: {sku}</span>
        <button type="button">
          <ChatBubbleOutline />
          Adicionar descrição
        </button>
      </ProductInfo>
      <QuantityContainer>
        <div>
          <button type="button" onClick={() => decrement(id)}>
            <Remove />
          </button>
          <span>{quantidade}</span>
          <button type="button" onClick={() => increment(id)}>
            <Add />
          </button>
        </div>
      </QuantityContainer>
      <TotalDeleteContainer>
        <strong>{cartTotal}</strong>
        <button type="button" onClick={() => removeFromCart(id)}>
          <Delete />
        </button>
      </TotalDeleteContainer>
    </Container>
  );
};

export default CartItem;
