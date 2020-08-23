import styled from 'styled-components';

export const Container = styled.div`
  background: #f5f5f5;
`;

export const InnerContainer = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0;

  span {
    color: #616161;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;

    svg {
      margin-right: 5px;
    }
  }

  @media only screen and (max-width: 425px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 20px;

    span {
      margin-top: 5px;
    }
  }
`;
