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
  ModalInfosTitle,
  ModalSection3,
  ModalTripleFormGroup,
  ModalValidButton,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import InputText, { LabelError } from "../../../input/InputText";
import { useState } from "react";
import InputImage from "../../../input/InputImage";
import InputSelect from "../../../input/InputSelect";
import InputPlainText from "../../../input/inputPlainText";
import SwitchData from "../../../input/SwitchData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";
import { createStore } from "../../../../redux/features/stores";

interface Props {
  setAction: Function;
}

const StockModal = ({ setAction }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string>("");
  const [reference, setReference] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string | null>(null);
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [designation, setDesignation] = useState<string | null>(null);
  const [designationError, setDesignationError] = useState<string | null>(null);
  const [unitPrice, setUnitPrice] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [sellingPrice, setSellingPrice] = useState<string | null>(null);
  const [purchasePrice, setPurchasePrice] = useState<string | null>(null);
  const [lotNumber, setLotNumber] = useState<string | null>(null);
  const [operatingPressure, setOperatingPressure] = useState<string | null>(
    null
  );
  const [diameter, setDiameter] = useState<string | null>(null);
  const [fluid, setFluid] = useState<string | null>(null);
  const [isLength, setIsLength] = useState(false);
  const [comment, setComment] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [supplier, setSupplier] = useState<string | null>(null);
  const [supplierError, setSupplierError] = useState<string>("");
  const [warehouse, setWarehouse] = useState<string | null>(null);
  const [warehouseError, setWarehouseError] = useState<string>("");

  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.store.isLoad);
  const categories = useSelector((state: RootState) => state.category.datas);
  const suppliers = useSelector((state: RootState) => state.supplier.datas);
  const warehouses = useSelector((state: RootState) => state.warehouse.datas);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name) {
      return setNameError("Veuillez inserer le nom de l'article");
    }

    if (!designation) {
      return setDesignationError(
        "Veuillez inserer la désignation de l'article"
      );
    }

    if (!quantity) {
      return setQuantityError(
        "Veuillez insérer la valeur en stock de l'article"
      );
    }
    if (quantity && isNaN(parseFloat(quantity))) {
      return setQuantityError("La valeur inserer une valeur numerique");
    }

    if (unitPrice && isNaN(parseFloat(unitPrice))) {
      return setPriceError("Les valeurs de prix doivent être numerique");
    }

    if (sellingPrice && isNaN(parseFloat(sellingPrice))) {
      return setPriceError("Les valeurs de prix doivent être numerique");
    }

    if (purchasePrice && isNaN(parseFloat(purchasePrice))) {
      return setPriceError("Les valeurs de prix doivent être numerique");
    }

    if (!supplier) {
      return setSupplierError("Inserer le nom du fournisseur");
    }
    if (!warehouse) {
      return setWarehouseError("Inserer le secteur de stockage");
    }
    if (!category) {
      return setCategoryError("Inserer la catégorie de l'article");
    }

    const form = new FormData();
    form.append("logo", image || "");
    form.append("name", name);
    form.append("reference", reference || "");
    form.append("code", code || "");
    form.append("type", type || "");
    form.append("quantity", quantity);
    form.append("designation", designation || "");
    form.append("purchasePrice", purchasePrice || "");
    form.append("sellingPrice", sellingPrice || "");
    form.append("unitPrice", unitPrice || "");
    form.append("lotNumber", lotNumber || "");
    form.append("operatingPressure", operatingPressure || "");
    form.append("diameter", diameter || "");
    form.append("fluid", fluid || "");
    form.append("comment", comment || "");
    form.append("supplier", supplier || "");
    form.append("warehouse", warehouse || "");
    form.append("category", category || "");
    form.append("hasLength", isLength ? "true" : "false");

    createStore(form, (exit: boolean) => {
      if (exit) {
        setAction(false);
      }
    })(dispatch);
  };

  console.log(categories);

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
              error={nameError}
              placeholder="Le nom de l'article"
            />
            <InputText
              name="Code"
              id="code"
              defaultValue={code}
              setValue={setCode}
              error={""}
              placeholder="Le code de l'article (Iddentifiant unique)"
            />
            <InputText
              name="Type"
              id="type"
              defaultValue={type}
              setValue={setType}
              error={""}
              placeholder="Le type d'article"
            />

            <InputText
              name="Référence"
              id="length"
              defaultValue={reference}
              setValue={setReference}
              error={""}
              suffix=""
              placeholder="La référence de l'article (voir fabriquant)"
            />
            <InputSelect
              placeholder="Sélectionner le fournisseur"
              name="Fournisseur *"
              id="supplier"
              defaultValue={supplier}
              setId={setSupplier}
              error={supplierError}
              data={suppliers}
            />
          </ModalForm>
          <ModalForm>
            <InputSelect
              name="Entrepôt *"
              id="warehouse"
              defaultValue={warehouse}
              setId={setWarehouse}
              placeholder="Sélectionner l'entrepôt"
              error={warehouseError}
              data={warehouses}
            />
            <InputSelect
              name="Catégorie "
              id="category"
              defaultValue={category}
              setId={setCategory}
              placeholder="Sélectionner une catégorie"
              error={categoryError}
              data={categories}
            />
            <InputPlainText
              name="Désignation "
              id="designation"
              defaultValue={designation}
              setValue={setDesignation}
              error={designationError}
            />
            <ModalDoubleFormGroup>
              <SwitchData
                getData={setQuantity}
                isLength={setIsLength}
                error={quantityError}
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
            {priceError && <LabelError>{priceError}</LabelError>}
            <InputText
              name="Numéro Lot"
              id="nl"
              defaultValue={lotNumber}
              setValue={setLotNumber}
              error={""}
            />
          </ModalForm>
          <ModalForm>
            <ModalInfosTitle>Infos supplémentaire</ModalInfosTitle>

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
            <InputPlainText
              name="Commentaire"
              id="comment"
              defaultValue={comment}
              setValue={setComment}
              error={""}
            />
          </ModalForm>
        </ModalSection3>

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

export default StockModal;
