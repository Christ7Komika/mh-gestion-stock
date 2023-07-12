import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import {
  ModalCancelButton,
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
import { useEffect, useState } from "react";
import InputImage from "../../../input/InputImage";
import InputSelect from "../../../input/InputSelect";
import InputPlainText from "../../../input/inputPlainText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";
import {
  createStore,
  getStore,
  updateStore,
} from "../../../../redux/features/stores";
import { host } from "../../../../redux/host";

interface Props {
  setAction: Function;
  currentId?: string;
}

const UpdateModal = ({ setAction, currentId }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [designation, setDesignation] = useState<string | null>(null);
  const [unitPrice, setUnitPrice] = useState<string | null>(null);
  const [sellingPrice, setSellingPrice] = useState<string | null>(null);
  const [purchasePrice, setPurchasePrice] = useState<string | null>(null);
  const [lotNumber, setLotNumber] = useState<string | null>(null);
  const [operatingPressure, setOperatingPressure] = useState<string | null>(
    null
  );
  const [diameter, setDiameter] = useState<string | null>(null);
  const [fluid, setFluid] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [supplier, setSupplier] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.store.isLoad);
  const isLoadChange = useSelector(
    (state: RootState) => state.store.isLoadChange
  );
  const categories = useSelector((state: RootState) => state.category.datas);
  const suppliers = useSelector((state: RootState) => state.supplier.datas);
  const store = useSelector((state: RootState) => state.store.data);

  const getImagePath = (image: string | undefined) => {
    if (image) {
      const split = image.split("\\");
      return `${host}/image/${split[split.length - 1]}`;
    }
    return "";
  };

  useEffect(() => {
    if (currentId) {
      getStore(currentId)(dispatch);
    }
  }, [currentId]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      !name &&
      !image &&
      !reference &&
      !type &&
      !designation &&
      !purchasePrice &&
      !sellingPrice &&
      !unitPrice &&
      !lotNumber &&
      !operatingPressure &&
      !diameter &&
      !fluid &&
      !supplier &&
      !category
    ) {
      return setError("Veuillez remplir au moins un des champs du formulaire.");
    }

    const form = new FormData();
    form.append("logo", image || "");
    form.append("name", name || "");
    form.append("reference", reference || "");
    form.append("code", code || "");
    form.append("type", type || "");
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
    form.append("category", category || "");
    if (currentId) {
      updateStore(currentId, form, (exit: boolean) => {
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
          <ModalHeaderTitle>Modification des articles</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalSection3>
          <ModalForm>
            <InputImage
              setValue={setImage}
              id="image"
              defaultImage={getImagePath(store?.image)}
            />
            <InputText
              name="Nom"
              id="name"
              defaultValue={store?.name || name}
              setValue={setName}
              error={""}
              placeholder="Le nom de l'article"
            />
            <InputText
              name="Code"
              id="code"
              defaultValue={store?.code || code}
              setValue={setCode}
              error={""}
              placeholder="Le code de l'article"
            />
            <InputText
              name="Type"
              id="type"
              defaultValue={store?.type || type}
              setValue={setType}
              error={""}
              placeholder="Le type d'article"
            />

            <InputText
              name="Référence"
              id="length"
              defaultValue={store?.reference || reference}
              setValue={setReference}
              error={""}
              suffix=""
              placeholder="La référence de l'article (voir fabriquant)"
            />
          </ModalForm>
          <ModalForm>
            <InputSelect
              placeholder="Sélectionner le fournisseur"
              name="Fournisseur"
              id="supplier"
              defaultValue={store?.Supplier.id || supplier}
              setId={setSupplier}
              error={""}
              data={suppliers}
            />
            <InputSelect
              name="Catégorie "
              id="category"
              defaultValue={store?.Category.id || category}
              setId={setCategory}
              placeholder="Sélectionner une catégorie"
              error={""}
              data={categories}
            />
            <InputPlainText
              name="Désignation "
              id="designation"
              defaultValue={store?.designation || designation}
              setValue={setDesignation}
              error={""}
            />
            <ModalTripleFormGroup>
              <InputText
                name="Prix d'achat"
                id="pa"
                defaultValue={store?.purchasePrice || purchasePrice}
                setValue={setPurchasePrice}
                error={""}
              />
              <InputText
                name="Prix de vente"
                id="pv"
                defaultValue={store?.sellingPrice || sellingPrice}
                setValue={setSellingPrice}
                error={""}
              />
              <InputText
                name="Prix unitaire"
                id="pu"
                defaultValue={store?.unitPrice || unitPrice}
                setValue={setUnitPrice}
                error={""}
              />
            </ModalTripleFormGroup>

            <InputText
              name="Numéro Lot"
              id="nl"
              defaultValue={store?.lotNumber || lotNumber}
              setValue={setLotNumber}
              error={""}
            />
          </ModalForm>
          <ModalForm>
            <ModalInfosTitle>Infos supplémentaire</ModalInfosTitle>

            <InputText
              name="Pression de service"
              id="pressionService"
              defaultValue={store?.operatingPressure || operatingPressure}
              setValue={setOperatingPressure}
              error={""}
            />
            <InputText
              name="Diamétre"
              id="diameter"
              defaultValue={store?.diameter || diameter}
              setValue={setDiameter}
              error={""}
            />
            <InputText
              name="Fluide"
              id="fluid"
              defaultValue={store?.fluid || fluid}
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
        {error && <LabelError>{error}</LabelError>}

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

export default UpdateModal;
