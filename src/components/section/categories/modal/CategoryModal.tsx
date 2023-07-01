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
import { createCategory } from "../../../../redux/features/category";

interface Props {
  setAction: Function;
}

const CategoryModal = ({ setAction }: Props) => {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.category.isLoad);
  const isError = useSelector((state: RootState) => state.category.isError);

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

    createCategory(name, (exit: boolean) => {
      if (exit) {
        setAction(false);
      }
    })(dispatch);
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
            name="Nom *"
            id="name"
            defaultValue={name}
            setValue={setName}
            error={nameError}
          />
        </ModalForm>
        {isError && <ModalMessageError>La requête a été</ModalMessageError>}
        {isLoad ? (
          <ModalGroupButton>
            <ModalValidButton onClick={(e: React.SyntheticEvent) => submit(e)}>
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

export default CategoryModal;