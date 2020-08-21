import React, { useMemo } from 'react';
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
  ContainerContent,
  Topbar,
  ContactInfo,
  UserInfo,
  LogoContainer,
  MenuContainer,
  MenuLinks,
  SearchContainer,
  CartContainer,
} from './styles';
import { useCart } from '../../hooks/cart';
import formatValue from '../../utils/formatValue';

const Header: React.FC = () => {
  const { products } = useCart();

  const cartTotal = useMemo(() => {
    const { total } = products.reduce(
      (accumulator, product) => {
        const subtotal = product.quantidade * product.valor_unitario;

        accumulator.total += subtotal;

        return accumulator;
      },
      {
        total: 0,
      },
    );

    return formatValue(total);
  }, [products]);

  return (
    <Container>
      <ContainerContent>
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
            <a href="/">
              <ShoppingCart />
              {cartTotal}
            </a>
          </CartContainer>
        </MenuContainer>
      </ContainerContent>
    </Container>
  );
};

export default Header;
