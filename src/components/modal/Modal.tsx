import styled from "styled-components";
import SupplierModal from "./SupplierModal";

const Modal = () => {
  return (
    <Container>
      <SupplierModal />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff3e;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Modal;
