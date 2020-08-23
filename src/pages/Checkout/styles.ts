import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 30px 50px;

  h1 {
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -1.5px;
  }

  @media only screen and (max-width: 1024px) {
    padding: 30px 20px;
  }
`;

export const Content = styled.div`
  form {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const AddressInfo = styled.div`
  max-width: 690px;
  width: 100%;

  strong {
    display: block;
    padding: 10px 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    color: #212121;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0.1px;
    text-transform: uppercase;
  }

  @media only screen and (max-width: 768px) {
    max-width: 768px;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    flex: 1;
  }

  @media only screen and (max-width: 425px) {
    flex-direction: column;
  }
`;

export const CardInfoContainer = styled.aside`
  max-width: 320px;
  width: 100%;
  border: 1px solid #e0e0e0;

  > div {
    padding: 20px;
  }

  @media only screen and (max-width: 768px) {
    max-width: 768px;
    margin-top: 20px;
    border: none;

    > div {
      padding: 0;
    }
  }
`;

export const CardInfoTitle = styled.strong`
  display: block;
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e0;
  color: #212121;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.1px;
  text-transform: uppercase;

  @media only screen and (max-width: 768px) {
    padding: 10px 10px;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  strong {
    font-size: 16px;
    line-height: 30px;
    font-weight: 700;
  }
`;

export const CheckoutButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 17px;
  border: none;
  background: #e53935;
  color: #fff;
  font-size: 16px;
  font-weight: 700;

  &:hover {
    background: ${shade(0.2, '#e53935')};
  }
`;
