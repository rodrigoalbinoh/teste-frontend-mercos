import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 18px 24px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #e0e0e0;

  & + div {
    margin-top: 24px;
  }
  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }
  ${(props) =>
    props.isFocused &&
    css`
      color: #e53935;
      border-color: #e53935;
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: #e53935;
    `}
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #b7b7cc;
    &::placeholder {
      color: #b7b7cc;
    }
  }
  svg {
    margin-right: 16px;
  }
`;
