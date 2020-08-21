import React from 'react';
import { LocalShipping, LocalOffer, Payment } from '@material-ui/icons';

import { Container, InnerContainer } from './styles';

const HeaderInformationBar: React.FC = () => {
  return (
    <Container>
      <InnerContainer>
        <span>
          <LocalShipping />
          Delivery apenas para Joinville
        </span>

        <span>
          <LocalOffer />
          Desconto de 10% nas compras acima de R$ 200,00
        </span>

        <span>
          <Payment />
          Pague em até 12x no cartão
        </span>
      </InnerContainer>
    </Container>
  );
};

export default HeaderInformationBar;
