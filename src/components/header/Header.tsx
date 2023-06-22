import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import NavBar from "../navbar/NavBar";

const Header = () => {
  const { pathname } = useLocation();

  const getPath = () => {
    return pathname.split("/").filter((p) => p !== "");
  };

  return (
    <>
      <NavBar />
      <Container>
        <SideContent>
          <Logo>MH</Logo>
          <BreadCrumb>
            {getPath().map((p, index) => {
              return (
                <BreadCrumbText>
                  {p}
                  {index + 1 < getPath().length && <FaChevronRight size={10} />}
                </BreadCrumbText>
              );
            })}
          </BreadCrumb>
        </SideContent>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline-end: 2rem;
  box-shadow: 0px 2px 4px 0px #7f646464;
  background: #fff;
  position: relative;
  z-index: 4;
`;

const SideContent = styled.div`
  display: flex;
  gap: 2rem;
`;

const Logo = styled.h1`
  width: 90px;
  height: 70px;
  background: #e16d2b;
  text-align: center;
  line-height: 70px;
  font-weight: 800;
  font-size: 2.5rem;
  color: #122d8c;
`;

const BreadCrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BreadCrumbText = styled.p`
  color: #222635;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

export default Header;
