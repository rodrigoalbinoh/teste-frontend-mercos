import styled, { css } from 'styled-components';

interface FieldProps {
  isFocused: boolean;
}

export const Container = styled.div`
  margin: 10px 10px 0 10px;
`;

export const Field = styled.div<FieldProps>`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 18px 24px;
  margin: 5px 0 0 0;
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

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #212121;
    &::placeholder {
      color: #616161;
    }
  }
  svg {
    margin-right: 16px;
  }
`;
