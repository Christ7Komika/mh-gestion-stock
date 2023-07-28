import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import {
  ModalCancelButton,
  ModalForm,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalMessageError,
  ModalStockInfos,
  ModalStockInfosData,
  ModalValidButton,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import InputText from "../../../input/InputText";
import React, { useEffect, useState } from "react";
import InputPlainText from "../../../input/InputPlainText";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantityToStore,
  getHistory,
  getStore,
} from "../../../../redux/features/stores";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";
import bcrypt from "bcryptjs";

interface Props {
  setAction: Function;
}

const AddToStockModal = ({ setAction }: Props) => {
  const [quantity, setQuantity] = useState<string | null>(null);
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.store.data);
  const isLoad = useSelector((state: RootState) => state.store.isLoad);
  const currentId = useSelector((state: RootState) => state.store.currentId);
  const isLoadChange = useSelector(
    (state: RootState) => state.store.isLoadChange
  );
  const pwd = useSelector((state: RootState) => state.configuration.data);

  const initData = () => {
    setQuantity(null);
    setQuantityError(null);
    setComment(null);
  };

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
    if (!quantity) {
      return setQuantityError("Champ vide");
    }

    // if (!password) {
    //   return setPasswordError("Veuillez inserer le mot de passe.");
    // }

    if (pwd) {
      const isValid = true; // bcrypt.compareSync(password, pwd.password);
      if (isValid && currentId) {
        addQuantityToStore(
          currentId,
          {
            quantity: quantity,
            comment: comment || "",
          },
          (exit: boolean) => {
            if (exit) {
              getHistory()(dispatch);
              initData();
              setAction(false);
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
          <ModalHeaderTitle>Ajouter article</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalStockInfos>
          {isLoad ? (
            <Loader />
          ) : store?.hasLength ? (
            <>
              <ModalStockInfosData>
                Longueur totale : {store.quantity} mètre(s)
              </ModalStockInfosData>
              <ModalStockInfosData>
                Stockage : {store?.Warehouse?.name}
              </ModalStockInfosData>
            </>
          ) : (
            <>
              <ModalStockInfosData>
                Quantité total: {store?.quantity}
              </ModalStockInfosData>
              <ModalStockInfosData>
                Stockage : {store?.Warehouse.name}
              </ModalStockInfosData>
            </>
          )}
        </ModalStockInfos>
        <ModalForm style={{ width: "100%" }}>
          {store?.hasLength ? (
            <InputText
              name="Longueur *"
              id="length"
              defaultValue={quantity}
              setValue={setQuantity}
              error={quantityError}
              placeholder="La valeur inserer doit être en mètre"
            />
          ) : (
            <InputText
              name="Quantité *"
              id="quantity"
              defaultValue={quantity}
              setValue={setQuantity}
              error={quantityError}
              placeholder="Veuillez inserer la qunatité á ajouter"
            />
          )}
        </ModalForm>

        <ModalForm style={{ width: "100%" }}>
          <InputPlainText
            name="Commentaire"
            id="comment"
            defaultValue={comment}
            setValue={setComment}
            error={""}
          />

          {/* <InputText
            name="password"
            id="password"
            defaultValue={""}
            setValue={setPassword}
            error={passwordError}
          /> */}
        </ModalForm>
        {error && <ModalMessageError>{error}</ModalMessageError>}
        {isLoadChange ? (
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

export default AddToStockModal;
