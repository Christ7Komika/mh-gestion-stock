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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";
import InputPlainText from "../../../input/InputPlainText";
import InputSelect from "../../../input/InputSelect";
import {
  changeCategory,
  getHistory,
  getStore,
} from "../../../../redux/features/stores";
import bcrypt from "bcryptjs";
import InputText, { LabelError } from "../../../input/InputText";

interface Props {
  setAction: Function;
}

const ChangeCategoryModal = ({ setAction }: Props) => {
  const [category, setCategory] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const isLoadChange = useSelector(
    (state: RootState) => state.store.isLoadChange
  );
  const categories = useSelector((state: RootState) => state.category.datas);
  const currentId = useSelector((state: RootState) => state.store.currentId);
  const store = useSelector((state: RootState) => state.store.data);
  const pwd = useSelector((state: RootState) => state.configuration.data);

  useEffect(() => {
    if (currentId) {
      getStore(currentId)(dispatch);
    }
  }, [currentId]);

  useEffect(() => {
    if (passwordError && password) {
      setPasswordError("");
    }
  }, [password, passwordError]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!category) {
      return setCategoryError("Le champ est vide");
    }

    if (!password) {
      return setPasswordError("Veuillez inserer le mot de passe.");
    }

    if (pwd) {
      const isValid = bcrypt.compareSync(password, pwd.password);

      if (isValid && currentId) {
        changeCategory(
          currentId,
          {
            category: category,
            comment: comment || "",
          },
          (exit: boolean) => {
            if (exit) {
              getHistory()(dispatch);
              return setAction(false);
            }
          }
        )(dispatch);
        return;
      }
      return setError("Mot de passe inserer invalide.");
    }
  };
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Modifier la catégorie</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalForm>
          <InputSelect
            name="Catégorie *"
            id="category"
            defaultValue={store?.Category.id || category}
            setId={setCategory}
            placeholder="Sélectionner la catégorie"
            error={categoryError}
            data={categories}
          />
          <InputPlainText
            name=""
            id="Commentaire"
            defaultValue={comment}
            setValue={setComment}
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
        {error && <LabelError>{error}</LabelError>}
        {isLoadChange ? (
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

export default ChangeCategoryModal;
