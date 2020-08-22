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
  observacao: string;
  handleAddObservation: (product: ProductObservation) => void;
}

interface ProductObservation {
  id: number;
  observacao: string;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  sku,
  nome,
  quantidade,
  valor_unitario,
  url_imagem,
  observacao,
  handleAddObservation,
}) => {
  const { increment, decrement, removeFromCart } = useCart();

  const cartTotal = formatValue(quantidade * valor_unitario);

  function setAddingObservation(): void {
    handleAddObservation({
      id,
      observacao,
    });
  }

  return (
    <Container>
      <ProductImage src={url_imagem} alt={nome} />
      <ProductInfo>
        <strong>{nome}</strong>
        <span>SKU: {sku}</span>
        <button type="button" onClick={() => setAddingObservation()}>
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
