import React, { useState } from 'react';
import { ShoppingCart } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
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
} from './styles';
import CartItem from '../../components/CartItem';
import ModalAddObservation from '../../components/ModalAddObservation';

interface EditingProduct {
  id: number;
  observacao: string;
}

const Cart: React.FC = () => {
  const [observationModalOpen, setObservationModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<EditingProduct>(
    {} as EditingProduct,
  );

  const {
    products,
    cartTotal,
    discountValue,
    cartSubtotal,
    totalItens,
    addObservation,
  } = useCart();

  const history = useHistory();

  function handleAddObservation({
    observacao,
  }: Omit<EditingProduct, 'id'>): void {
    addObservation({
      id: editingProduct.id,
      observacao,
    });
  }

  function toggleEditModal(): void {
    setObservationModalOpen(!observationModalOpen);
  }

  function setAddingObservation(product: EditingProduct): void {
    setEditingProduct(product);
    toggleEditModal();
  }

  return (
    <Container>
      <h1>Carrinho</h1>
      <Content>
        <CartItems>
          {!products ? (
            <span>
              <ShoppingCart />
              Carrinho vazio
            </span>
          ) : (
            products.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                handleAddObservation={setAddingObservation}
              />
            ))
          )}
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
                <strong>{formatValue(cartSubtotal)}</strong>
              </div>
              <div>
                <span>Descontos</span>
                <strong>{formatValue(discountValue)}</strong>
              </div>
            </CartInfo>
            <Total>
              <strong>Total</strong>
              <strong>{formatValue(cartTotal)}</strong>
            </Total>
            <CheckoutButton
              type="button"
              onClick={() => history.push('/checkout')}
            >
              Finalizar compra
            </CheckoutButton>
          </div>
        </CartSummary>
      </Content>

      <ModalAddObservation
        isOpen={observationModalOpen}
        setIsOpen={toggleEditModal}
        addingObservation={editingProduct}
        handleAddObservation={handleAddObservation}
      />
    </Container>
  );
};

export default Cart;
