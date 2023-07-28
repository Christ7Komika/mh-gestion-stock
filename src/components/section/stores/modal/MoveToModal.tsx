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
  ModalStockInfosData,
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
  getHistory,
  getStore,
  moveToStore,
} from "../../../../redux/features/stores";
import InputText from "../../../input/InputText";

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setAction: Function;
}

const MoveToModal = ({ setAction }: Props) => {
  const [quantity, setQuantity] = useState<string | null>(null);
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [warehouse, setWarehouse] = useState<string | null>(null);
  const [warehouseError, setWarehouseError] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const isLoadChange = useSelector(
    (state: RootState) => state.store.isLoadChange
  );
  const warehouses = useSelector((state: RootState) => state.warehouse.datas);
  const currentId = useSelector((state: RootState) => state.store.currentId);
  const store = useSelector((state: RootState) => state.store.data);
  const isLoad = useSelector((state: RootState) => state.store.isLoad);

  useEffect(() => {
    if (currentId) {
      getStore(currentId)(dispatch);
    }
  }, [currentId]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!warehouse) {
      return setWarehouseError("Le champ est vide");
    }

    if (warehouse === store?.Warehouse.id) {
      return setError(
        "Veuillez séléctionner un stockage différent de " +
          store?.Warehouse.name
      );
    }

    if (!quantity) {
      return setQuantityError("Champ vide");
    }

    if (store) {
      const currentQuantity = parseFloat(store.quantity) - parseFloat(quantity);
      if (currentQuantity < 0) {
        if (store.hasLength) {
          return setError(
            "La longueur inscrite est superieur à la longueur en stock"
          );
        } else {
          return setError(
            "La quantité inscrite est superieur à la quantité en stock"
          );
        }
      }
      if (currentId) {
        const data = {
          warehouse: warehouse,
          quantity: quantity,
          currentQuantity: currentQuantity.toString(),
          hasLength: store.hasLength,
          comment: comment || "",
        };
        moveToStore(currentId, data, (exit: boolean) => {
          if (exit) {
            getHistory()(dispatch);
            return setAction(false);
          }
        })(dispatch);
      }
    }
  };
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Changer de stockage</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
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
        <ModalForm>
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
          <InputSelect
            name="Entrepôt *"
            id="warehouse"
            defaultValue={store?.Warehouse.id || warehouse}
            setId={setWarehouse}
            placeholder="Sélectionner l'entrepôt"
            error={warehouseError}
            data={warehouses}
          />
          <InputPlainText
            name=""
            id="Commentaire"
            defaultValue={comment}
            setValue={setComment}
            error={""}
          />
          {error && <ModalMessageError>{error}</ModalMessageError>}
        </ModalForm>

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

export default MoveToModal;
