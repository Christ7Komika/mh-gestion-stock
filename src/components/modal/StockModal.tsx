import { styled } from "styled-components";
import { color } from "../../utils/color";
import {
  ModalCancelButton,
  ModalDoubleFormGroup,
  ModalForm,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalInfosTitle,
  ModalSection3,
  ModalTripleFormGroup,
  ModalValidButton,
} from "../layout/Layout";
import { IoExit } from "react-icons/io5";
import InputText from "../input/InputText";
import React, { useEffect, useState } from "react";
import InputImage from "../input/InputImage";
import InputSelect from "../input/InputSelect";
import InputPlainText from "../input/inputPlainText";

interface Props {
  setAction: Function;
}

const StockModal = ({ setAction }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [supplier, setSupplier] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [designation, setDesignation] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);
  const [unitPrice, setUnitPrice] = useState<string | null>(null);
  const [sellingPrice, setSellingPrice] = useState<string | null>(null);
  const [purchasePrice, setPurchasePrice] = useState<string | null>(null);
  const [warehouse, setWarehouse] = useState<string | null>(null);
  const [lotNumber, setLotNumber] = useState<string | null>(null);
  const [operatingPressure, setOperatingPressure] = useState<string | null>(
    null
  );
  const [diameter, setDiameter] = useState<string | null>(null);
  const [fluid, setFluid] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Ajouter un fournisseur</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalSection3>
          <ModalForm>
            <InputImage setValue={setImage} id="image" defaultImage={""} />
            <InputText
              name="Nom *"
              id="name"
              defaultValue={name}
              setValue={setName}
              error={""}
            />
            <InputText
              name="Code *"
              id="code"
              defaultValue={code}
              setValue={setCode}
              error={""}
            />
            <InputText
              name="Type"
              id="type"
              defaultValue={type}
              setValue={setType}
              error={""}
            />

            <InputSelect
              name="Reference *"
              id="reference"
              defaultValue={reference}
              setValue={setReference}
              error={""}
              placeholder="Sélectionner une référence"
            />
            <InputSelect
              placeholder="Sélectionner un fournisseur"
              name="Fournisseur *"
              id="supplier"
              defaultValue={supplier}
              setValue={setSupplier}
              error={""}
            />
          </ModalForm>
          <ModalForm>
            <InputSelect
              name="Entrepôt"
              id="warehouse"
              defaultValue={warehouse}
              setValue={setWarehouse}
              placeholder="Sélectionner l'entrepôt"
              error={""}
            />
            <InputPlainText
              name="Désignation"
              id="designation"
              defaultValue={designation}
              setValue={setDesignation}
              error={""}
            />
            <ModalDoubleFormGroup>
              <InputText
                name="Quantité"
                id="quantity"
                defaultValue={quantity}
                setValue={setQuantity}
                error={""}
              />
              <InputText
                name="Longueur"
                id="length"
                defaultValue={length}
                setValue={setLength}
                error={""}
                suffix="(m)"
              />
            </ModalDoubleFormGroup>
            <ModalTripleFormGroup>
              <InputText
                name="Prix d'achat"
                id="pa"
                defaultValue={purchasePrice}
                setValue={setPurchasePrice}
                error={""}
              />
              <InputText
                name="Prix de vente"
                id="pv"
                defaultValue={sellingPrice}
                setValue={setSellingPrice}
                error={""}
              />
              <InputText
                name="Prix unitaire"
                id="pu"
                defaultValue={unitPrice}
                setValue={setUnitPrice}
                error={""}
              />
            </ModalTripleFormGroup>
            <InputText
              name="Numéro Lot"
              id="nl"
              defaultValue={lotNumber}
              setValue={setLotNumber}
              error={""}
            />
            <InputPlainText
              name="Commentaire"
              id="comment"
              defaultValue={comment}
              setValue={setComment}
              error={""}
            />
          </ModalForm>
          <ModalForm>
            <ModalInfosTitle>Infos supplémentaire</ModalInfosTitle>
            <InputSelect
              name="Catégorie"
              id="category"
              defaultValue={category}
              setValue={setCategory}
              placeholder="Sélectionner une catégorie"
              error={""}
            />
            <InputText
              name="Pression de service *"
              id="pressionService"
              defaultValue={operatingPressure}
              setValue={setOperatingPressure}
              error={""}
            />
            <InputText
              name="Diamétre"
              id="diameter"
              defaultValue={diameter}
              setValue={setDiameter}
              error={""}
            />
            <InputText
              name="Fluide"
              id="fluid"
              defaultValue={fluid}
              setValue={setFluid}
              error={""}
            />
          </ModalForm>
        </ModalSection3>

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

export default StockModal;
