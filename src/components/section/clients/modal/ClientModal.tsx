import { styled } from "styled-components";
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
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import InputText from "../../../input/InputText";
import InputImage from "../../../input/InputImage";
import { createClient, getHistory } from "../../../../redux/features/client";
import { color } from "../../../../utils/color";
import { Loader } from "../../../loader/Loader";

interface Props {
  setAction: Function;
}

const ClientModal = ({ setAction }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [companyError, setCompanyError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.client.isLoad);

  useEffect(() => {
    if (nameError && name) {
      setNameError("");
    }

    if (companyError && company) {
      setCompanyError("");
    }

    if (emailError && email) {
      setEmailError("");
    }
  }, [nameError, emailError, companyError]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name) {
      return setNameError("Champ vide");
    }

    if (!company) {
      return setCompanyError("Champ vide");
    }

    const form = new FormData();
    form.append("logo", image || "");
    form.append("name", name);
    form.append("company", company);
    form.append("phone", tel);
    form.append("email", email);
    createClient(form, (exit: boolean) => {
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
          <ModalHeaderTitle>Ajouter un Client</ModalHeaderTitle>
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
            name="Société *"
            id="société"
            defaultValue={company}
            setValue={setCompany}
            error={companyError}
          />
          <InputText
            name="Téléphone 1"
            id="tel1"
            defaultValue={tel}
            setValue={setTel}
            error={""}
          />
          <InputText
            name="Email"
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
  width: 100%;
  max-width: 500px;
`;

export default ClientModal;
