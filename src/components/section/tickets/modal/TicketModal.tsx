import {
  ModalCancelButton,
  ModalContainer,
  ModalForm,
  Modal,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalInfosContent,
  ModalInputGroup,
  ModalSection3x2,
  ModalValidButton,
  ModalAddArticleContainer,
  ModalDataInfosArticleRemoveContainer,
  ModalDataAddArticle,
  ModalDataInfosArticleContent,
  ModalDataInfosArticleRemove,
  SearchButton,
  ModalTableContainer,
  ModalTableHead,
  ModalDataContainer,
} from "../../../layout/Layout";
import { IoExit, IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import InputText, { LabelError } from "../../../input/InputText";
import { useEffect, useState, useRef } from "react";
import InputSelect from "../../../input/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";
import SimpleSearch from "../../../input/SimpleSearch";
import { getClients } from "../../../../redux/features/client";
import {
  StoreType,
  emptyDatasStores,
  getNotifications,
  getWarning,
  searchDatasStores,
} from "../../../../redux/features/stores";
import ModalDataContentSection from "../../../split/ModalDataContentSection";
import ModalArticleInfosSection from "../../../split/ModalArticleInfosSection";
import {
  TicketTypeData,
  createTicket,
  getHistory,
} from "../../../../redux/features/ticket";

interface Props {
  setAction: Function;
}

export type UpdateStoreType = StoreType & { withdraw: number };

const TicketModal = ({ setAction }: Props) => {
  const [name, setName] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderNumberError, setOrderNumberError] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [clientError, setClientError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [article, setArticle] = useState<StoreType | null>(null);
  const [searchData, setSearchData] = useState<StoreType[] | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<
    UpdateStoreType[] | []
  >([]);
  const [sumArticle, setSumArticle] = useState<UpdateStoreType[] | []>([]);
  const [removed, setRemoved] = useState<boolean>(false);
  const [removedId, setRemovedId] = useState<string>("");
  const [discount, setDiscount] = useState<number | null>(null);
  const [applicant, setApplicant] = useState<string>("");
  const [articleError, setArticleError] = useState<string>("");
  const [discountError, setDiscountError] = useState<string>("");

  const sumRef = useRef<HTMLSpanElement>(null);

  const dispatch = useDispatch();
  const clients = useSelector((state: RootState) => state.client.datas);
  const isLoad = useSelector((state: RootState) => state.client.isLoad);

  const searchArticles = useSelector(
    (state: RootState) => state.store.dataSearch
  );
  const isLoadCreate = useSelector(
    (state: RootState) => state.ticket.isLoadCreate
  );
  const [articleNumberError, setArticleNumberError] = useState<string>("");

  useEffect(() => {
    setSearchData(searchArticles);
  }, [searchArticles]);

  useEffect(() => {
    getClients()(dispatch);
  }, []);

  useEffect(() => {
    if (name && nameError) {
      setNameError("");
    }
  }, [name, nameError]);

  useEffect(() => {
    if (orderNumber && orderNumberError) {
      setOrderNumberError("");
    }
  }, [orderNumber, orderNumberError]);

  useEffect(() => {
    if (client && clientError) {
      setClientError("");
    }
  }, [client, clientError]);

  useEffect(() => {
    if (sumArticle && sumArticle.length > 0 && articleError) {
      setArticleError("");
    }
  }, [sumArticle, articleError]);

  useEffect(() => {
    if (discount && typeof discount === "number" && discountError) {
      setDiscountError("");
    }
  }, [discount, discountError]);

  useEffect(() => {
    setSumArticle([...sumValuesAndRemoveDuplicates(selectedArticle)]);
  }, [selectedArticle]);

  useEffect(() => {
    if (sumArticle || discount) {
      sum(sumArticle);
    }
  }, [sumArticle, discount]);

  function formatNumberWithSpaces(quantity: number, sellingPrice: string) {
    let value = quantity * parseFloat(sellingPrice.replace(" ", ""));

    let str = value.toString();
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const searchArticle = () => {
    emptyDatasStores()(dispatch);
    if (search) {
      setArticle(null);
      searchDatasStores(search)(dispatch);
    }
  };

  const close = () => {
    emptyDatasStores()(dispatch);
    setArticle(null);
    setAction(false);
  };

  const sumValuesAndRemoveDuplicates = (
    elements: UpdateStoreType[]
  ): UpdateStoreType[] => {
    const elementMap: Map<string, UpdateStoreType> = new Map();
    elements.forEach((element) => {
      const { id, withdraw } = element;
      if (elementMap.has(id)) {
        const existingElement = elementMap.get(id) as UpdateStoreType;
        existingElement.withdraw += withdraw;
      } else {
        elementMap.set(id, { ...element });
      }
    });

    return Array.from(elementMap.values());
  };

  const sum = (data: UpdateStoreType[] | []) => {
    if (!data || data.length === 0) {
      return [0];
    }
    if (data.length > 0) {
      let value = data.reduce(
        (total, article) =>
          total +
          article.withdraw * parseFloat(article.unitPrice.replace(" ", "")),
        0
      );

      let remise: number | null = null;
      let resultRest: string = "";
      let result: string | null = null;
      if (discount) {
        const purcent = discount / 100;
        const rest = value * purcent;
        remise = value - rest;
        resultRest = remise.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return [result, resultRest];
      } else {
        result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return [result];
      }
    } else {
      return [0];
    }
  };

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name) {
      return setNameError("Champ vide");
    }
    if (!orderNumber) {
      return setOrderNumberError("Champ vide");
    }
    if (!client) {
      return setClientError("Champ vide");
    }

    if (sumArticle.length === 0) {
      return setArticleError("Aucun article n' a été ajouté");
    }

    if (discount && typeof parseFloat(discount.toString()) !== "number") {
      return setDiscountError("La valeur doit être un nombre");
    }

    const data: TicketTypeData = {
      name: name as string,
      orderNumber: orderNumber,
      client: client,
      articles: sumArticle,
      applicant: applicant,
      discount: discount?.toString() || "0",
      sum: sumRef.current?.textContent as string,
    };

    createTicket(data, (exit: boolean) => {
      if (exit) {
        getWarning()(dispatch);
        getNotifications()(dispatch);
        getHistory()(dispatch);
        emptyDatasStores()(dispatch);
        setArticle(null);
        setAction(false);
      }
    })(dispatch);
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Créer un ticket</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => close()}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalSection3x2>
          <ModalForm>
            <InputText
              name="Nom *"
              id="name"
              defaultValue={name}
              setValue={setName}
              error={nameError}
            />
            <InputText
              name="Numéro de commande"
              id="orderNumber"
              defaultValue={orderNumber}
              setValue={setOrderNumber}
              error={orderNumberError}
            />
            <InputText
              name="Demandeur"
              id="applicant"
              defaultValue={applicant}
              setValue={setApplicant}
              error={""}
            />
            <InputSelect
              placeholder="Sélectionner le client"
              name="Client *"
              id="client"
              defaultValue={client}
              setId={setClient}
              error={clientError}
              data={clients}
            />
            <InputText
              name="Remise"
              id="remise"
              type="number"
              setValue={setDiscount}
              error={discountError}
              placeholder=""
            />
            {articleError && (
              <LabelError
                onClick={() => setArticleError("")}
                style={{ cursor: "pointer" }}
              >
                {articleError}
              </LabelError>
            )}
            <ModalInfosContent>
              <span>Nombre article(s)</span>
              <span>{sumArticle.length}</span>
            </ModalInfosContent>
            <ModalInfosContent>
              <span>Somme</span>
              {sumArticle.length > 0 && discount ? (
                <span ref={sumRef}>
                  {sum(sumArticle)[0]} FCFA - {discount}% -&gt;{" "}
                  {sum(sumArticle)[1]} FCFA
                </span>
              ) : sumArticle.length > 0 && !discount ? (
                <span ref={sumRef}>{sum(sumArticle)[0]} FCFA</span>
              ) : (
                <span ref={sumRef}>0 FCFA</span>
              )}
            </ModalInfosContent>
            <ModalAddArticleContainer>
              {sumArticle.length > 0 &&
                sumArticle.map((selected) => (
                  <ModalDataAddArticle>
                    <ModalDataInfosArticleContent>
                      <p>
                        {selected?.withdraw} * {selected.unitPrice} ={" "}
                        {formatNumberWithSpaces(
                          selected.withdraw,
                          selected.unitPrice
                        )}{" "}
                        FCFA
                      </p>
                      <p>{selected.designation}</p>
                    </ModalDataInfosArticleContent>
                    <ModalDataInfosArticleRemoveContainer>
                      <ModalDataInfosArticleRemove
                        onClick={() => {
                          setRemovedId(selected.id);
                          setRemoved(true);
                        }}
                      >
                        <RxCross2 size={10} />
                      </ModalDataInfosArticleRemove>
                    </ModalDataInfosArticleRemoveContainer>
                  </ModalDataAddArticle>
                ))}
            </ModalAddArticleContainer>
          </ModalForm>
          <ModalForm>
            <ModalInputGroup>
              <SimpleSearch setSearch={setSearch} />
              <SearchButton onClick={() => searchArticle()}>
                <IoSearch size={20} />
              </SearchButton>
            </ModalInputGroup>
            {articleNumberError && (
              <LabelError
                onClick={() => setArticleNumberError("")}
                style={{ cursor: "pointer" }}
              >
                {articleNumberError}
              </LabelError>
            )}
            {searchData && (
              <ModalTableContainer>
                <ModalTableHead>
                  <p>Nom/Désignation</p>
                  <p>Q/L</p>
                </ModalTableHead>
                <ModalDataContainer>
                  {searchData.map((articleData) => (
                    <ModalDataContentSection
                      articleData={articleData}
                      searchData={searchData}
                      setArticle={setArticle}
                      setArticleNumberError={setArticleNumberError}
                      setSelectedArticle={setSelectedArticle}
                      selectedArticle={selectedArticle}
                      sumArticle={sumArticle}
                      setSumArticle={setSumArticle}
                      setRemoved={setRemoved}
                      removed={removed}
                      removedId={removedId}
                      setRemovedId={setRemovedId}
                    />
                  ))}
                </ModalDataContainer>
              </ModalTableContainer>
            )}
            {article && <ModalArticleInfosSection article={article} />}
          </ModalForm>
        </ModalSection3x2>

        {isLoadCreate ? (
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
            <ModalCancelButton onClick={() => close()}>
              Annuler
            </ModalCancelButton>
          </ModalGroupButton>
        )}
      </Modal>
    </ModalContainer>
  );
};

export default TicketModal;
