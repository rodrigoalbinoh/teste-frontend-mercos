import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';

import {
  Container,
  Content,
  AddressInfo,
  FieldGroup,
  CardInfoContainer,
  CardInfoTitle,
  Total,
  CheckoutButton,
} from './styles';
import formatValue from '../../utils/formatValue';
import { useCart } from '../../hooks/cart';
import InputMask from '../../components/InputMask';

interface CheckoutData {
  rua: string;
  bairro: string;
  numero: string;
  numero_cartao: string;
  cvc: string;
}

const Checkout: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { cartTotal } = useCart();

  const handleSubmit = useCallback(async (data: CheckoutData) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <h1>Checkout</h1>

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <AddressInfo>
            <strong>Endereço</strong>
            <FieldGroup>
              <Input name="rua" placeholder="Rua" label="Rua" />
              <Input name="numero" placeholder="Número" label="Número" />
            </FieldGroup>
            <Input name="bairro" placeholder="Bairro" label="Bairro" />
          </AddressInfo>

          <CardInfoContainer>
            <CardInfoTitle>Pagamento</CardInfoTitle>
            <div>
              <div>
                <InputMask
                  name="numero_cartao"
                  label="Número do Cartão"
                  placeholder="____ ____ ____ ____"
                  mask="9999 9999 9999 9999"
                />
                <InputMask
                  name="cvc"
                  label="Código de Segurança"
                  placeholder="CVC"
                  mask="999"
                />
              </div>
              <Total>
                <strong>Total</strong>
                <strong>{formatValue(cartTotal)}</strong>
              </Total>
              <CheckoutButton type="submit">Pagar</CheckoutButton>
            </div>
          </CardInfoContainer>
        </Form>
      </Content>
    </Container>
  );
};

export default Checkout;
