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
import { useState } from "react";
// import InputImage from "../../../input/InputImage";
import InputSelect from "../../../input/InputSelect";
import InputPlainText from "../../../input/inputPlainText";

interface Props {
  setAction: Function;
}

const WithdrawToStockModal = ({ setAction }: Props) => {
  const [code, setCode] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);
  const [supplier, setSupplier] = useState<string | null>(null);
  const [wareHouse, setWarehouse] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);

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
          <ModalStockInfosData>Total article: 120</ModalStockInfosData>
          <ModalStockInfosData>Total longueur: 16m</ModalStockInfosData>
        </ModalStockInfos>
        <ModalForm style={{ width: "100%" }}>
          <InputText
            name="Code *"
            id="code"
            defaultValue={code}
            setValue={setCode}
            error={""}
          />
        </ModalForm>
        <ModalDoubleFormGroup style={{ width: "100%" }}>
          <InputText
            name="Quantité *"
            id="quantity"
            defaultValue={quantity}
            setValue={setQuantity}
            error={""}
          />
          <InputText
            name="Longueur *"
            id="length"
            defaultValue={length}
            setValue={setLength}
            error={""}
          />
        </ModalDoubleFormGroup>
        <ModalForm style={{ width: "100%" }}>
          {/* <InputSelect
            name="Fournisseur *"
            id="supplier"
            defaultValue={supplier}
            setValue={setSupplier}
            error={""}
            placeholder="Sélectionner un fournisseur"
          />
          <InputSelect
            name="Réference *"
            id="reference"
            defaultValue={reference}
            setValue={setReference}
            error={""}
            placeholder="Sélectionner un fournisseur"
          />
          <InputSelect
            name="Entrepôt dans lequel vous l'ajoutez *"
            id="warehouse"
            defaultValue={wareHouse}
            setValue={setWarehouse}
            error={""}
            placeholder="Sélectionner un entrepôt"
          /> */}
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

export default WithdrawToStockModal;
