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
      <GroupLink>
        <CustomLink to="/" active={isActive("/")}>
          ACCEUIL
        </CustomLink>
        <CustomLink active={isActive("/entrepot")} to="/entrepot">
          ENTREPÔTS
        </CustomLink>
        <CustomLink active={isActive("/stocks")} to="/stocks">
          STOCKS
        </CustomLink>
        <CustomLink active={isActive("/ticket")} to="/ticket">
          TICKETS
        </CustomLink>
        <CustomLink active={isActive("/emplacement")} to="/emplacement">
          EMPLACEMENTS
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
        <CustomLink active={isActive("/historique")} to="/historique">
          HISTORIQUE
        </CustomLink>
        <CustomLink active={isActive("/configurations")} to="/configurations">
          CONFIGURATION
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
  height: 45px;
  background: #222635;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 2rem;
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

export default NavBar;
