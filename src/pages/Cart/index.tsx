import React, { useState } from 'react';

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
import ModalAddObservation from '../../components/ModalAddObservation';

interface EditingProduct {
  id: number;
  observacao: string;
}

interface ObservationData {
  observacao: string;
}

const Cart: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
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

  function handleAddObservation({
    observacao,
  }: Omit<ObservationData, 'id'>): void {
    addObservation({
      id: editingProduct.id,
      observacao,
    });
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
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
              handleAddObservation={setAddingObservation}
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
            <CheckoutButton type="button">Finalizar compra</CheckoutButton>
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
