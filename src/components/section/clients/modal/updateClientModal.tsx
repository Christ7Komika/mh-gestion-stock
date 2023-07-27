import { styled } from "styled-components";
import {
  ModalCancelButton,
  ModalForm,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalMessageError,
  ModalValidButton,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import InputText from "../../../input/InputText";
import InputImage from "../../../input/InputImage";
import {
  ClientType,
  updateClient,
  getHistory,
} from "../../../../redux/features/client";
import { color } from "../../../../utils/color";
import { Loader } from "../../../loader/Loader";
import { getImagePath } from "../../../../utils/image";

interface Props {
  setAction: Function;
  client: ClientType | null;
}

const UpdateClientModal = ({ setAction, client }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [companyError, setCompanyError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

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

  console.log(client);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!name && !image && !company && !tel && !email) {
      return setError(true);
    }

    let logo = image && image.name ? image.name : "";
    if (client) {
      const form = new FormData();
      form.append("logo", logo);
      form.append("name", name);
      form.append("company", company);
      form.append("phone", tel);
      form.append("email", email);
      updateClient(client.id, form, (exit: boolean) => {
        if (exit) {
          getHistory()(dispatch);
          setAction(false);
        }
      })(dispatch);
    }
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
          <InputImage
            setValue={setImage}
            id="image"
            defaultImage={getImagePath(client?.logo)}
          />
          <InputText
            name="Nom *"
            id="name"
            defaultValue={
              name ? name : client && client.name ? client.name : ""
            }
            setValue={setName}
            error={nameError}
          />
          <InputText
            name="Société *"
            id="société"
            defaultValue={
              company ? company : client && client.company ? client.company : ""
            }
            setValue={setCompany}
            error={companyError}
          />
          <InputText
            name="Téléphone 1"
            id="tel1"
            defaultValue={
              tel ? tel : client && client.phone ? client.phone : ""
            }
            setValue={setTel}
            error={""}
          />
          <InputText
            name="Email"
            id="email"
            defaultValue={
              email ? email : client && client.email ? client.email : ""
            }
            setValue={setEmail}
            error={emailError}
          />
        </ModalForm>
        {error && (
          <ModalMessageError>
            Veuillez remplir au moins un champ à modifier
          </ModalMessageError>
        )}
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

export default UpdateClientModal;
