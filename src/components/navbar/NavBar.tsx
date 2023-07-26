import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  const location = useLocation();

  const isActive = (url: string) => {
    return location.pathname === url ? "true" : "false";
  };

  return (
    <Container>
      <Logo>MH</Logo>
      <GroupLink>
        <CustomLink to="/" active={isActive("/")}>
          ACCEUIL
        </CustomLink>
        <CustomLink active={isActive("/stocks")} to="/stocks">
          STOCKS
        </CustomLink>
        <CustomLink active={isActive("/entrepot")} to="/entrepot">
          ENTREPÔTS
        </CustomLink>
        <CustomLink active={isActive("/ticket")} to="/ticket">
          TICKETS
        </CustomLink>
        <CustomLink active={isActive("/categories")} to="/categories">
          CATÉGORIES
        </CustomLink>
        <CustomLink active={isActive("/fournisseurs")} to="/fournisseurs">
          FOURNISSEURS
        </CustomLink>
        <CustomLink active={isActive("/clients")} to="/clients">
          CLIENT
        </CustomLink>
        <CustomLink active={isActive("/stock-management")} to="/stock-management">
          GESTION DE STOCK
        </CustomLink>
      </GroupLink>
    </Container>
  );
};

interface LinkProps {
  active: "true" | "false";
}

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background: #222635;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const GroupLink = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CustomLink = styled(Link)<LinkProps>`
  color: ${({ active }) => (active === "true" ? "#E16D2B" : "#fff")};
  text-decoration: none;
  font-size: 0.9rem;
  transition: linear 0.2s;

  &:hover {
    color: ${({ active }) => active === "false" && "#ffffff7d"};
  }
`;

const Logo = styled.h1`
  width: 90px;
  height: 60px;
  background: #e16d2b;
  text-align: center;
  line-height: 60px;
  font-weight: 800;
  font-size: 2rem;
  color: #122d8c;
`;


export default NavBar;
