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
  form {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
`;

export const AddressInfo = styled.div`
  max-width: 690px;
  width: 100%;

  strong {
    display: block;
    padding: 10px 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    color: #212121;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0.1px;
    text-transform: uppercase;
  }
`;

export const CardInfoContainer = styled.aside`
  max-width: 320px;
  width: 100vw;
  height: 300px;
  border: 1px solid #e0e0e0;

  > div {
    padding: 20px;
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
