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

import { color } from "../../../../utils/color";
import {
  SupplierType,
  getHistory,
  updateSupplier,
} from "../../../../redux/features/supplier";
import { Loader } from "../../../loader/Loader";
import { getImagePath } from "../../../../utils/image";
import bcrypt from "bcryptjs";

interface Props {
  setAction: Function;
  supplier: SupplierType | null;
}

const UpdateSupplierModal = ({ setAction, supplier }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.supplier.isLoad);
  const pwd = useSelector((state: RootState) => state.configuration.data);

  useEffect(() => {
    if (nameError && name) {
      setNameError("");
    }

    if (emailError && email) {
      setEmailError("");
    }

    if (passwordError && password) {
      setPasswordError("");
    }
  }, [nameError, name, email, emailError, password, passwordError]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!name && !image && !tel && !email) {
      return setError(
        "Veuillez remplier au moins un des champs en plus du mot de passe."
      );
    }
    if (!password) {
      return setPasswordError("Veuillez inserer le mot de passe.");
    }

    if (pwd) {
      const isValid = bcrypt.compareSync(password, pwd.password);
      if (isValid && supplier) {
        const form = new FormData();
        form.append("logo", image || "");
        form.append("name", name);
        form.append("phone", tel);
        form.append("email", email);
        updateSupplier(supplier.id, form, (exit: boolean) => {
          if (exit) {
            getHistory()(dispatch);
            setAction(false);
          }
        })(dispatch);
      }
      return setError("Mot de passe inserer invalide.");
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
        <ModalForm>
          <InputImage
            setValue={setImage}
            id="image"
            defaultImage={getImagePath(supplier?.logo)}
          />
          <InputText
            name="Nom"
            id="name"
            defaultValue={
              name ? name : supplier && supplier.name ? supplier.name : ""
            }
            setValue={setName}
            error={nameError}
          />
          <InputText
            name="Numéro de téléphone"
            id="tel"
            defaultValue={
              tel ? tel : supplier && supplier.phone ? supplier.phone : ""
            }
            setValue={setTel}
            error={""}
          />
          <InputText
            name="Email"
            id="email"
            defaultValue={
              email ? email : supplier && supplier.email ? supplier.email : ""
            }
            setValue={setEmail}
            error={emailError}
          />
          <InputText
            type="password"
            name="password"
            id="password"
            defaultValue={""}
            setValue={setPassword}
            error={passwordError}
          />
        </ModalForm>
        {error && <ModalMessageError>{error}</ModalMessageError>}
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

export default UpdateSupplierModal;
