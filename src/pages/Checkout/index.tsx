import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
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
import { useToast } from '../../hooks/toast';

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
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: CheckoutData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        rua: Yup.string().required('Rua é um campo obrigatório'),
        numero: Yup.string().required('Número é um campo obrigatório'),
        bairro: Yup.string().required('Bairro é um campo obrigatório'),
        numero_cartao: Yup.string().required(
          'Número do Cartão é um campo obrigatório',
        ),
        cvc: Yup.string().required(
          'Código de verificação é um campo obrigatório',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
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
