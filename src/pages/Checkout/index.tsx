import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';

import {
  Container,
  Content,
  AddressInfo,
  CardInfoContainer,
  CardInfoTitle,
  CheckoutButton,
} from './styles';

interface CheckoutData {
  rua: string;
  bairro: string;
  numero: string;
  numero_cartao: string;
  cvc: string;
}

const Checkout: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: CheckoutData) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <h1>Checkout</h1>

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <AddressInfo>
            <strong>Endereço</strong>
            <Input name="rua" placeholder="Rua" />
            <Input name="bairro" placeholder="Bairro" />
            <Input name="numero" placeholder="Número" />
          </AddressInfo>

          <CardInfoContainer>
            <CardInfoTitle>Pagamento</CardInfoTitle>
            <div>
              <div>
                <Input name="numero_cartao" placeholder="---- ---- ---- ----" />
                <Input name="cvc" placeholder="CVC" />
              </div>
              <CheckoutButton type="button">Pagar</CheckoutButton>
            </div>
          </CardInfoContainer>
        </Form>
      </Content>
    </Container>
  );
};

export default Checkout;
