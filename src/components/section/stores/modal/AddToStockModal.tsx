import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import {
  ModalCancelButton,
  ModalDoubleFormGroup,
  ModalForm,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalStockInfos,
  ModalStockInfosData,
  ModalValidButton,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import InputText from "../../../input/InputText";
import { useEffect, useState } from "react";
import InputPlainText from "../../../input/inputPlainText";
import { useDispatch, useSelector } from "react-redux";
import { getStore } from "../../../../redux/features/stores";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";

interface Props {
  setAction: Function;
  currentId?: string;
}

const AddToStockModal = ({ setAction, currentId }: Props) => {
  const [code, setCode] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);

  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.store.data);
  const isLoad = useSelector((state: RootState) => state.store.isLoad);

  useEffect(() => {
    if (currentId) {
      getStore(currentId)(dispatch);
    }
  }, [currentId]);

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
          {isLoad && <Loader />}
          {store?.hasLength ? (
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
              error={""}
              placeholder="La valeur inserer doit être en mètre"
            />
          ) : (
            <InputText
              name="Quantité *"
              id="quantity"
              defaultValue={quantity}
              setValue={setQuantity}
              error={""}
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
        </ModalForm>
        <ModalGroupButton>
          <ModalValidButton>Valider</ModalValidButton>
          <ModalCancelButton onClick={() => setAction(false)}>
            Annuler
          </ModalCancelButton>
        </ModalGroupButton>
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
