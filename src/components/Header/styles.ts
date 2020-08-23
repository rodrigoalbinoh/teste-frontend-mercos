import styled from 'styled-components';

export const Container = styled.header``;

export const ContainerContent = styled.div`
  max-width: 1180px;
  margin: 0 auto;

  @media only screen and (max-width: 1024px) {
    padding: 0 10px;
  }
`;

export const Topbar = styled.div`
  padding-top: 20px;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 425px) {
    flex-direction: column;
  }
`;

export const ContactInfo = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;

  svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;

export const UserInfo = styled.div`
  display: flex;

  @media only screen and (max-width: 425px) {
    margin-top: 5px;
  }

  span {
    display: flex;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-size: 500;
    line-height: 20px;
    font-size: 12px;

    & + span {
      margin-left: 15px;
    }

    svg {
      font-size: 20px;
      margin-right: 5px;
    }
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 10px 0;
`;

export const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px 0;

  @media only screen and (max-width: 425px) {
    grid-template-columns: initial;
    grid-template-areas:
      'MN MN CART'
      'SCH SCH SCH';
    grid-column-gap: 5px;
    grid-row-gap: 10px;
    padding: 10px 10px;
  }
`;

export const MenuLinks = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 425px) {
    grid-area: MN;
  }

  a {
    display: flex;
    text-decoration: none;
    color: #212121;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0.1px;

    & + a {
      margin-left: 25px;
    }

    svg {
      font-size: 24px;
      margin-right: 5px;
    }
  }
`;

export const SearchContainer = styled.div`
  @media only screen and (max-width: 425px) {
    grid-area: SCH;
  }

  form {
    display: flex;
    max-width: 450px;
    width: 100%;
    border-bottom: 1px solid #212121;

    input {
      flex: 1;
      border: none;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;

      &::placeholder {
        color: #9e9e9e;
      }
    }

    button {
      background: none;
      border: none;
    }
  }
`;

export const CartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (max-width: 425px) {
    grid-area: CART;
  }

  a {
    display: inline-flex;
    vertical-align: middle;
    text-decoration: none;
    color: #212121;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0.1px;

    & + a {
      margin-left: 25px;
    }

    svg {
      font-size: 24px;
      margin-right: 5px;
      color: #e53935;
    }
  }
`;
