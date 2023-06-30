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

interface Props {
  setAction: Function;
  supplier: SupplierType | null;
}

const UpdateSupplierModal = ({ setAction, supplier }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  // const [reference, setReference] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.supplier.isLoad);
  const isError = useSelector((state: RootState) => state.supplier.isError);

  useEffect(() => {
    if (nameError && name) {
      setNameError("");
    }

    if (emailError && email) {
      setEmailError("");
    }
  }, [nameError, emailError]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // if (!name && !image && !reference && !tel && !email) {
    if (!name && !image && !tel && !email) {
      return setError(true);
    }

    let logo = image && image.name ? image.name : "";
    if (supplier) {
      const form = new FormData();
      form.append("logo", logo);
      form.append("name", name);
      // form.append("reference", reference);
      form.append("phone", tel);
      form.append("email", email);
      updateSupplier(supplier.id, form, (exit: boolean) => {
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
          <ModalHeaderTitle>Ajouter un fournisseur</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalForm>
          <InputImage
            setValue={setImage}
            id="image"
            defaultImage={supplier && supplier.logo ? supplier.logo : ""}
          />
          <InputText
            name="Nom *"
            id="name"
            defaultValue={
              name ? name : supplier && supplier.name ? supplier.name : ""
            }
            setValue={setName}
            error={nameError}
          />
          {/* <InputText
            name="Référence "
            id="reference"
            defaultValue={
              reference
                ? reference
                : supplier && supplier.reference
                ? supplier.reference[]
                : ""
            }
            setValue={setReference}
            error={""}
          /> */}
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
        </ModalForm>
        {isError && <ModalMessageError>La requête a été</ModalMessageError>}
        {error && (
          <ModalMessageError>
            Veuillez remplir au moins un champ à modifier
          </ModalMessageError>
        )}
        {isLoad ? (
          <ModalGroupButton>
            <ModalValidButton onClick={(e: React.SyntheticEvent) => submit(e)}>
              Validation en cour...
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

export default UpdateSupplierModal;
