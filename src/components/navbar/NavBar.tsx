import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPass } from "../../redux/features/configuration";
import { IoNotificationsSharp, IoAdd } from "react-icons/io5";
import ConfigurationModal from "./modal/ConfigurationModal";
import WarningModal from "./modal/WarningModal";
import NotificationModal from "./modal/NotificationModal";
const NavBar = () => {
  const [configurationModal, setConfigurationModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    getPass()(dispatch);
  }, []);

  const isActive = (url: string) => {
    return location.pathname === url ? "true" : "false";
  };

  return (
    <>
      {configurationModal && (
        <ConfigurationModal setAction={setConfigurationModal} />
      )}
      {warningModal && <WarningModal setAction={setWarningModal} />}
      {notificationModal && (
        <NotificationModal setAction={setNotificationModal} />
      )}
      <Container>
        <LeftSide>
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
            <CustomLink
              active={isActive("/stock-management")}
              to="/stock-management"
            >
              GESTION DE STOCK
            </CustomLink>
          </GroupLink>
        </LeftSide>
        <RightSide>
          <WarningButton onClick={() => setWarningModal(!warningModal)}>
            <WarningSpan>
              <IoAdd size={10} />
            </WarningSpan>
            <IoNotificationsSharp size={15} />
          </WarningButton>
          <NotificationButton
            onClick={() => setNotificationModal(!notificationModal)}
          >
            <NotificationSpan>
              <IoAdd size={10} />
            </NotificationSpan>
            <IoNotificationsSharp size={15} />
          </NotificationButton>
          <ConfigurationButton
            onClick={() => setConfigurationModal(!configurationModal)}
          >
            Configuration
          </ConfigurationButton>
        </RightSide>
      </Container>
    </>
  );
};

interface LinkProps {
  active: "true" | "false";
}

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background: #222635;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  align-items: center;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 2rem;
`;

const RightSide = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 2rem;
  gap: 1rem;
  align-items: center;
  height: 100%;
`;

const GroupLink = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ConfigurationButton = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 35px;
  border: 1px solid #0079ff;
  background: #0079ff;
  color: #fff;
  cursor: pointer;
  transition: linear 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;

const NotificationButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  color: #fff;
  cursor: pointer;
  transition: linear 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffa41b;
  border: 1px solid #ffa41b;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
`;

const WarningButton = styled(NotificationButton)`
  background: #e76161;
  border: 1px solid #e76161;
`;

const NotificationSpan = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #ffa41b;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -4px;
  right: -4px;
  color: #ffa41b;
`;

const WarningSpan = styled(NotificationSpan)`
  border: 1px solid #e76161;
  color: #e76161;
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
