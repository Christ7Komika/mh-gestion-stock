import { styled } from "styled-components";
import { color } from "../../utils/color";
import {
  ModalForm,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
} from "./Modal";
import { IoExit } from "react-icons/io5";
import InputText from "../input/InputText";

const SupplierModal = () => {
  return (
    <Container>
      <ModalHeader>
        <ModalHeaderTitle>Ajouter un fournisseur</ModalHeaderTitle>
        <ModalHeaderExit>
          <IoExit />
        </ModalHeaderExit>
      </ModalHeader>
      <ModalForm>
        <InputText />
      </ModalForm>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid ${color.darkBlue};
  border-radius: 5px;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export default SupplierModal;
