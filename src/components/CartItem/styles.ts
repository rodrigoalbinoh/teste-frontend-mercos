import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 10px 10px 15px 10px;
  border-bottom: 1px solid #e0e0e0;

  & + div {
    margin-top: 20px;
  }

  &:hover {
    background: #f5f5f5;
  }
`;

export const ProductImage = styled.img`
  width: 90px;
  height: 90px;
`;

export const ProductInfo = styled.div`
  max-width: 260px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 40px;

  strong {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #424242;
  }

  span {
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    line-height: 20px;
    color: #9e9e9e;
  }

  button {
    background: none;
    border: none;
    color: #e53935;
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 20px;

    svg {
      font-size: 20px;
      margin-right: 10px;
    }
  }
`;

export const QuantityContainer = styled.div`
  margin-left: 20px;
  width: 120px;

  > div {
    padding: 2px;
    border: 1px solid #bdbdbd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;

    button {
      background: none;
      border: none;
      color: #e53935;
      display: flex;
      align-items: center;
    }
  }
`;

export const TotalDeleteContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  margin-left: 20px;
  flex: 1;

  strong {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }

  button {
    background: none;
    border: none;
    color: #e53935;

    svg {
      font-size: 20px;
    }
  }
`;
