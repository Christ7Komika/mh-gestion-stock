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
import { changeSupplier, getStore } from "../../../../redux/features/stores";

interface Props {
  setAction: Function;
}

const ChangeSupplierModal = ({ setAction }: Props) => {
  const [supplier, setSupplier] = useState<string | null>(null);
  const [supplierError, setSupplierError] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const dispatch = useDispatch();
  const isLoadChange = useSelector(
    (state: RootState) => state.store.isLoadChange
  );
  const suppliers = useSelector((state: RootState) => state.supplier.datas);
  const currentId = useSelector((state: RootState) => state.store.currentId);
  const store = useSelector((state: RootState) => state.store.data);

  useEffect(() => {
    if (currentId) {
      getStore(currentId)(dispatch);
    }
  }, [currentId]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!supplier) {
      return setSupplierError("Le champ est vide");
    }
    if (currentId) {
      changeSupplier(
        currentId,
        {
          supplier: supplier,
          comment: comment || "",
        },
        (exit: boolean) => {
          if (exit) {
            return setAction(false);
          }
        }
      )(dispatch);
    }
  };
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Modifier le fournisseur</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalForm>
          <InputSelect
            name="Fournisseur *"
            id="supplier"
            defaultValue={store?.Supplier.id || supplier}
            setId={setSupplier}
            placeholder="Sélectionner le fournisseur"
            error={supplierError}
            data={suppliers}
          />
          <InputPlainText
            name=""
            id="Commentaire"
            defaultValue={comment}
            setValue={setComment}
            error={""}
          />
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

export default ChangeSupplierModal;
