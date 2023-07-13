import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import {
  ModalCancelButton,
  ModalForm,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalValidButton,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import InputText from "../../../input/InputText";
import React, { useEffect, useState } from "react";
import InputImage from "../../../input/InputImage";
import {
  createSupplier,
  getHistory,
} from "../../../../redux/features/supplier";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";

interface Props {
  setAction: Function;
}

const SupplierModal = ({ setAction }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const isLoad = useSelector((state: RootState) => state.supplier.isLoad);
  const dispatch = useDispatch();

  useEffect(() => {
    if (nameError && name) {
      setNameError("");
    }
  }, [nameError]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name) {
      return setNameError("Champ vide");
    }

    let logo = image && image.name ? image.name : "";

    const form = new FormData();
    form.append("logo", logo);
    form.append("name", name);
    form.append("phone", phone);
    form.append("email", email);
    createSupplier(form, (exit: boolean) => {
      if (exit) {
        getHistory()(dispatch);
        setAction(false);
      }
    })(dispatch);
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
            name="Téléphone"
            id="tel"
            defaultValue={phone}
            setValue={setPhone}
            error={""}
          />
          <InputText
            name="Email *"
            id="email"
            defaultValue={email}
            setValue={setEmail}
            error={emailError}
          />
        </ModalForm>
        {isLoad ? (
          <ModalGroupButton>
            <ModalValidButton>
              <Loader />
            </ModalValidButton>
          </ModalGroupButton>
        ) : (
          <ModalGroupButton>
            <ModalValidButton onClick={(e: React.SyntheticEvent) => submit(e)}>
              Valider
            </ModalValidButton>
            <ModalCancelButton onClick={() => setAction(false)}>
              Annuler
            </ModalCancelButton>
          </ModalGroupButton>
        )}
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

export default SupplierModal;
