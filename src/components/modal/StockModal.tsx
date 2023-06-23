import { styled } from "styled-components";
import { color } from "../../utils/color";
import {
  ModalCancelButton,
  ModalForm,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalSection3,
  ModalValidButton,
} from "../layout/Layout";
import { IoExit } from "react-icons/io5";
import InputText from "../input/InputText";
import React, { useEffect, useState } from "react";
import InputImage from "../input/InputImage";
import InputSelect from "../input/InputSelect";

interface Props {
  setAction: Function;
}

const StockModal = ({ setAction }: Props) => {
  const [name, setName] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [tel1, setTel1] = useState<string | null>(null);
  const [tel2, setTel2] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [referenceError, setReferenceError] = useState<string | null>(null);
  const [tel1Error, setTel1Error] = useState<string | null>(null);
  const [tel2Error, setTel2Error] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (nameError && name) {
      setNameError(null);
    }
  }, [nameError, tel1Error, tel2Error, emailError]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name) {
      return setNameError("Champ vide");
    }
  };
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Ajouter un fournisseur</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalSection3>
          <ModalForm>
            <InputImage setValue={setImage} id="image" defaultImage={""} />
            <InputText
              name="Nom *"
              id="name"
              defaultValue={name}
              setValue={setName}
              error={nameError}
            />
            <InputText
              name="Référence *"
              id="reference"
              defaultValue={reference}
              setValue={setReference}
              error={referenceError}
            />
            <InputText
              name="Téléphone 1 *"
              id="tel1"
              defaultValue={tel1}
              setValue={setTel1}
              error={tel1Error}
            />
            <InputText
              name="Téléphone 2"
              id="tel2"
              defaultValue={tel2}
              setValue={setTel2}
              error={tel1Error}
            />
            <InputSelect
              name="Reference *"
              id="email"
              defaultValue={email}
              setValue={setEmail}
              error={emailError}
            />
          </ModalForm>
          <ModalForm>
            <InputImage setValue={setImage} id="image" defaultImage={""} />
            <InputText
              name="Nom *"
              id="name"
              defaultValue={name}
              setValue={setName}
              error={nameError}
            />
            <InputText
              name="Référence *"
              id="reference"
              defaultValue={reference}
              setValue={setReference}
              error={referenceError}
            />
            <InputText
              name="Téléphone 1 *"
              id="tel1"
              defaultValue={tel1}
              setValue={setTel1}
              error={tel1Error}
            />
            <InputText
              name="Téléphone 2"
              id="tel2"
              defaultValue={tel2}
              setValue={setTel2}
              error={tel1Error}
            />
            <InputText
              name="Email *"
              id="email"
              defaultValue={email}
              setValue={setEmail}
              error={emailError}
            />
          </ModalForm>
        </ModalSection3>

        <ModalGroupButton>
          <ModalValidButton onClick={(e) => submit(e)}>
            Valider
          </ModalValidButton>
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

export default StockModal;
