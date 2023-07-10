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

import InputPlainText from "../../../input/inputPlainText";
import {
  Warehouse,
  WarehouseType,
  updateWarehouse,
} from "../../../../redux/features/warehouse";

interface Props {
  setAction: Function;
  warehouse: WarehouseType | null;
}

const UpdateWarehouseModal = ({ setAction, warehouse }: Props) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.warehouse.isLoad);
  const isError = useSelector((state: RootState) => state.warehouse.isError);

  useEffect(() => {
    if (nameError && name) {
      setNameError("");
    }
  }, [nameError]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!name && !description) {
      return setError(true);
    }
    if (warehouse) {
      const form: Warehouse = {
        name: name && name,
        description: description && description,
      };

      updateWarehouse(warehouse.id, form, (exit: boolean) => {
        if (exit) {
          setAction(false);
        }
      })(dispatch);
    }
  };
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Modifier un entrepôt</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalForm>
          <InputText
            name="Nom"
            id="name"
            defaultValue={
              name ? name : warehouse && warehouse.name ? warehouse.name : ""
            }
            setValue={setName}
            error={nameError}
          />
          <InputPlainText
            name="Description"
            id="desc"
            defaultValue={
              description
                ? description
                : warehouse && warehouse.description
                ? warehouse.description
                : ""
            }
            setValue={setDescription}
            error={""}
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

export default UpdateWarehouseModal;
