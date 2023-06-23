import styled from "styled-components";
import SupplierModal from "./SupplierModal";
import { color } from "../../utils/color";

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

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 2rem;
  height: 35px;
`;

export const ModalHeaderTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${color.darkBlue};
`;

export const ModalHeaderExit = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: ${color.red};
  color: ${color.darkRed};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
`;

export default Modal;
