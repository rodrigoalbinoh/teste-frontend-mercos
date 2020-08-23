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
`;

export const Content = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

export const CartItems = styled.div`
  max-width: 690px;
  width: 100%;

  > span {
    display: flex;
    place-items: center;
    justify-content: center;
    color: #616161;
  }
`;

export const CartSummary = styled.aside`
  max-width: 320px;
  width: 100vw;
  height: 300px;
  border: 1px solid #e0e0e0;

  > div {
    padding: 20px;
  }
`;

export const CartSummaryTitle = styled.strong`
  display: block;
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e0;
  color: #212121;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.1px;
  text-transform: uppercase;
`;

export const CartInfo = styled.div`
  padding-bottom: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;

    span {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }

    strong {
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

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
