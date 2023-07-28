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
import { color } from "../../../../utils/color";
import { Loader } from "../../../loader/Loader";
import {
  Category,
  CategoryType,
  updateCategory,
} from "../../../../redux/features/category";
import bcrypt from "bcryptjs";
import InputPlainText from "../../../input/InputPlainText";

interface Props {
  setAction: Function;
  category: CategoryType | null;
}

const UpdateCategoryModal = ({ setAction, category }: Props) => {
  const [name, setName] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.category.isLoad);
  const isError = useSelector((state: RootState) => state.category.isError);
  const pwd = useSelector((state: RootState) => state.configuration.data);

  useEffect(() => {
    if (nameError && name) {
      setNameError("");
    }
  }, [nameError]);

  useEffect(() => {
    if (passwordError && password) {
      setPasswordError("");
    }
  }, [passwordError]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!name && !reference && !description) {
      return setError(
        "Veuillez remplier au moins un des champs en plus du mot de passe."
      );
    }

    if (!password) {
      return setPasswordError("Veuillez inserer le mot de passe.");
    }
    if (pwd) {
      const isValid = bcrypt.compareSync(password, pwd.password);
      if (isValid && category) {
        const form: Category = {
          name: name && name,
          reference: reference && reference,
          description: description && description,
        };

        updateCategory(category.id, form, (exit: boolean) => {
          if (exit) {
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
          <ModalHeaderTitle>Ajouter une catégorie</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalForm>
          <InputText
            name="Nom"
            id="name"
            defaultValue={
              name ? name : category && category.name ? category.name : ""
            }
            setValue={setName}
            error={nameError}
          />
          <InputText
            name="Référence"
            id="reference"
            defaultValue={
              reference
                ? reference
                : category && category.reference
                ? category.reference
                : ""
            }
            setValue={setReference}
            error={""}
          />
          <InputPlainText
            name="Description"
            id="desc"
            defaultValue={
              description
                ? description
                : category && category.description
                ? category.description
                : ""
            }
            setValue={setDescription}
            error={""}
          />
          <InputText
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
`;

export default UpdateCategoryModal;
