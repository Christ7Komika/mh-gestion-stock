import { styled } from "styled-components";
import { color } from "../../utils/color";
import {
  ModalCancelButton,
  ModalForm,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalValidButton,
} from "../layout/Layout";
import { IoExit } from "react-icons/io5";
import InputText from "../input/InputText";
import { useState } from "react";

interface Props {
  setAction: Function;
}

const CategoriesModal = ({ setAction }: Props) => {
  const [name, setName] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Ajouter une catégorie</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />W
          </ModalHeaderExit>
        </ModalHeader>
        <ModalForm>
          <InputText
            name="Nom"
            id="name"
            defaultValue={name}
            setValue={setName}
            error={nameError}
          />
        </ModalForm>
        <ModalGroupButton>
          <ModalValidButton>Valider</ModalValidButton>
          <ModalCancelButton onClick={() => setAction(false)}>
            Annuler
          </ModalCancelButton>
        </ModalGroupButton>
      </Modal>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
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

const Modal = styled.div`
  border: 1px solid ${color.darkBlue};
  border-radius: 5px;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export default CategoriesModal;
