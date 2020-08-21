import React from 'react';
import {
  WhatsApp,
  Person,
  LocationOn,
  Menu,
  Search,
  ShoppingCart,
} from '@material-ui/icons';

import logo from '../../assets/sua-marca.png';
import {
  Container,
  InnerContainer,
  Topbar,
  ContactInfo,
  UserInfo,
  LogoContainer,
  MenuContainer,
  MenuLinks,
  SearchContainer,
  CartContainer,
} from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <InnerContainer>
        <Topbar>
          <ContactInfo>
            <WhatsApp />
            (47) 9999-9999
          </ContactInfo>
          <UserInfo>
            <span>
              <Person />
              Arethusa
            </span>
            <span>
              <LocationOn />
              Bom Retiro - Joinville, SC
            </span>
          </UserInfo>
        </Topbar>
        <LogoContainer>
          <img src={logo} alt="Sua marca" />
        </LogoContainer>
        <MenuContainer>
          <MenuLinks>
            <a href="#menu">
              <Menu />
              SETORES
            </a>
            <a href="/ofertas">OFERTAS</a>
          </MenuLinks>
          <SearchContainer>
            <form onSubmit={() => {}}>
              <input
                type="text"
                name="busca"
                id="busca"
                placeholder="O que você procura?"
              />
              <button type="submit">
                <Search />
              </button>
            </form>
          </SearchContainer>
          <CartContainer>
            <a href="/cart">
              <ShoppingCart />
              R$ 62,50
            </a>
          </CartContainer>
        </MenuContainer>
      </InnerContainer>
    </Container>
  );
};

export default Header;
