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
  ModalArticleInfos,
  ModalArticleInfosHead,
  ModalArticleData,
  ModalArticleInfosDataContainer,
  ModalTableHead,
  ModalDataContainer,
  ModalDataContent,
  ModalDataInfos,
  ModalDataForm,
  ModalDataInput,
  ModalDataInputAdd,
  ModalDataInputReset,
} from "../../../layout/Layout";
import { IoExit, IoSearch, IoRefresh, IoAdd, IoEye } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import InputText, { LabelError } from "../../../input/InputText";
import { useEffect, useState } from "react";
import InputSelect from "../../../input/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";
import SimpleSearch from "../../../input/SimpleSearch";
import { getClients } from "../../../../redux/features/client";
import {
  StoreType,
  emptyDatasStores,
  searchDatasStores,
} from "../../../../redux/features/stores";

interface Props {
  setAction: Function;
}

const TicketModal = ({ setAction }: Props) => {
  const [name, setName] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderNumberError, setOrderNumberError] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [clientError, setClientError] = useState<string>("");
  const [selectedArticles, setSelectedArticles] = useState<number>(0);
  const [sumArticle, setSumArticle] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [article, setArticle] = useState<StoreType | null>(null);
  const [searchData, setSearchData] = useState<StoreType[] | null>(null);

  const dispatch = useDispatch();
  const clients = useSelector((state: RootState) => state.client.datas);
  const isLoad = useSelector((state: RootState) => state.client.isLoad);
  const searchArticles = useSelector(
    (state: RootState) => state.store.dataSearch
  );
  const [articleNumber, setArticleNumber] = useState<string>("");
  const [articleNumberError, setArticleNumberError] = useState<string>("");

  useEffect(() => {
    setSearchData(searchArticles);
  }, [searchArticles]);

  useEffect(() => {
    if (searchData && articleNumber) {
      if (
        article &&
        parseFloat(articleNumber) > parseFloat(article?.quantity as string)
      ) {
        setArticleNumberError("La valeur superieur a la quantité en stock");
      } else {
        setArticleNumberError("");
      }
    }
  }, [articleNumber, article]);

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

  const searchArticle = () => {
    if (search) {
      searchDatasStores(search)(dispatch);
    }
  };

  const add = () => {
    const data = {
      articleNumber: articleNumber,
    };
  };

  const close = () => {
    emptyDatasStores()(dispatch);
    setArticle(null);
    setAction(false);
  };
  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name) {
      setNameError("Champ vide");
    }
    if (!orderNumber) {
      setOrderNumberError("Champ vide");
    }
    if (!client) {
      setClientError("Champ vide");
    }

    const data = {
      name: name,
      orderNumber: orderNumber,
      client: client,
    };

    console.log(data);
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
              placeholder="Le nom de l'article"
            />
            <InputText
              name="Numéro de commande"
              id="orderNumber"
              defaultValue={orderNumber}
              setValue={setOrderNumber}
              error={orderNumberError}
              placeholder="Inserer le numéro de commande"
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
            <ModalInfosContent>
              <span>Nombre article(s)</span>
              <span>{selectedArticles}</span>
            </ModalInfosContent>
            <ModalInfosContent>
              <span>Somme</span>
              <span>{sumArticle} FCFA</span>
            </ModalInfosContent>
            <ModalAddArticleContainer>
              <ModalDataAddArticle>
                <ModalDataInfosArticleContent>
                  <p>2</p>
                  <p>Lorem, ipsum.</p>
                </ModalDataInfosArticleContent>
                <ModalDataInfosArticleRemoveContainer>
                  <ModalDataInfosArticleRemove>
                    <RxCross2 size={10} />
                  </ModalDataInfosArticleRemove>
                </ModalDataInfosArticleRemoveContainer>
              </ModalDataAddArticle>
              <ModalDataAddArticle>
                <ModalDataInfosArticleContent>
                  <p>2</p>
                  <p>Lorem, ipsum.</p>
                </ModalDataInfosArticleContent>
                <ModalDataInfosArticleRemoveContainer>
                  <ModalDataInfosArticleRemove>
                    <RxCross2 size={10} />
                  </ModalDataInfosArticleRemove>
                </ModalDataInfosArticleRemoveContainer>
              </ModalDataAddArticle>
              <ModalDataAddArticle>
                <ModalDataInfosArticleContent>
                  <p>2</p>
                  <p>Lorem, ipsum.</p>
                </ModalDataInfosArticleContent>
                <ModalDataInfosArticleRemoveContainer>
                  <ModalDataInfosArticleRemove>
                    <RxCross2 size={10} />
                  </ModalDataInfosArticleRemove>
                </ModalDataInfosArticleRemoveContainer>
              </ModalDataAddArticle>
              <ModalDataAddArticle>
                <ModalDataInfosArticleContent>
                  <p>2</p>
                  <p>Lorem, ipsum.</p>
                </ModalDataInfosArticleContent>
                <ModalDataInfosArticleRemoveContainer>
                  <ModalDataInfosArticleRemove>
                    <RxCross2 size={10} />
                  </ModalDataInfosArticleRemove>
                </ModalDataInfosArticleRemoveContainer>
              </ModalDataAddArticle>
              <ModalDataAddArticle>
                <ModalDataInfosArticleContent>
                  <p>2</p>
                  <p>Lorem, ipsum.</p>
                </ModalDataInfosArticleContent>
                <ModalDataInfosArticleRemoveContainer>
                  <ModalDataInfosArticleRemove>
                    <RxCross2 size={10} />
                  </ModalDataInfosArticleRemove>
                </ModalDataInfosArticleRemoveContainer>
              </ModalDataAddArticle>
              <ModalDataAddArticle>
                <ModalDataInfosArticleContent>
                  <p>2</p>
                  <p>Lorem, ipsum.</p>
                </ModalDataInfosArticleContent>
                <ModalDataInfosArticleRemoveContainer>
                  <ModalDataInfosArticleRemove>
                    <RxCross2 size={10} />
                  </ModalDataInfosArticleRemove>
                </ModalDataInfosArticleRemoveContainer>
              </ModalDataAddArticle>
              <ModalDataAddArticle>
                <ModalDataInfosArticleContent>
                  <p>2</p>
                  <p>Lorem, ipsum.</p>
                </ModalDataInfosArticleContent>
                <ModalDataInfosArticleRemoveContainer>
                  <ModalDataInfosArticleRemove>
                    <RxCross2 size={10} />
                  </ModalDataInfosArticleRemove>
                </ModalDataInfosArticleRemoveContainer>
              </ModalDataAddArticle>
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
              <LabelError>{articleNumberError}</LabelError>
            )}
            {searchData && (
              <ModalTableContainer>
                <ModalTableHead>
                  <p>Nom/Désignation</p>
                  <p>Q/L</p>
                </ModalTableHead>
                <ModalDataContainer>
                  {searchData.map((articleData) => (
                    <ModalDataContent key={`search--${articleData.id}`}>
                      <ModalDataInfos>
                        <p>{articleData.designation}</p>
                        <p>
                          {articleData.quantity}{" "}
                          {articleData.hasLength ? "mètre(s)" : ""}{" "}
                        </p>
                      </ModalDataInfos>
                      <ModalDataForm>
                        <ModalDataInput
                          type="number"
                          min={0}
                          max={articleData.quantity}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setArticleNumber(e.target.value)
                          }
                        />
                        <ModalDataInputAdd
                          onClick={() => {
                            setArticle(articleData);
                            add();
                          }}
                        >
                          <IoAdd size={20} />
                        </ModalDataInputAdd>
                        <ModalDataInputReset
                          onClick={() => setArticle(articleData)}
                        >
                          <IoEye size={20} />
                        </ModalDataInputReset>
                        <ModalDataInputReset onClick={() => setArticle(null)}>
                          <IoRefresh size={20} />
                        </ModalDataInputReset>
                      </ModalDataForm>
                    </ModalDataContent>
                  ))}
                </ModalDataContainer>
              </ModalTableContainer>
            )}
            {article && (
              <ModalArticleInfos>
                <ModalArticleInfosHead>
                  <p>Infos</p>
                  <p>
                    Total restant {article.quantity}{" "}
                    {article.hasLength ? " mètre(s)" : ""}{" "}
                  </p>
                </ModalArticleInfosHead>
                <ModalArticleInfosDataContainer>
                  {article.name && (
                    <ModalArticleData>
                      <p>Nom</p>
                      <p>{article.name}</p>
                    </ModalArticleData>
                  )}
                  {article.designation && (
                    <ModalArticleData>
                      <p>Désignation</p>
                      <p>{article.designation}</p>
                    </ModalArticleData>
                  )}
                  {article.reference && (
                    <ModalArticleData>
                      <p>Reference</p>
                      <p>{article.reference}</p>
                    </ModalArticleData>
                  )}
                  {article.code && (
                    <ModalArticleData>
                      <p>Code</p>
                      <p>{article.code}</p>
                    </ModalArticleData>
                  )}
                  {article.lotNumber && (
                    <ModalArticleData>
                      <p>Numéro lot</p>
                      <p>{article.lotNumber}</p>
                    </ModalArticleData>
                  )}
                  {article.diameter && (
                    <ModalArticleData>
                      <p>Diamètre</p>
                      <p>{article.diameter}</p>
                    </ModalArticleData>
                  )}
                  {article.fluid && (
                    <ModalArticleData>
                      <p>Fluide</p>
                      <p>{article.fluid}</p>
                    </ModalArticleData>
                  )}
                  {article.operatingPressure && (
                    <ModalArticleData>
                      <p>Pression de service</p>
                      <p>{article.operatingPressure}</p>
                    </ModalArticleData>
                  )}
                  {article.Supplier && (
                    <ModalArticleData>
                      <p>Fournisseur</p>
                      <p>{article.Supplier.name}</p>
                    </ModalArticleData>
                  )}
                  {article.Category && (
                    <ModalArticleData>
                      <p>Catégorie</p>
                      <p>{article.Category.name}</p>
                    </ModalArticleData>
                  )}
                  {article.Warehouse && (
                    <ModalArticleData>
                      <p>Entrepôt</p>
                      <p>{article.Warehouse.name}</p>
                    </ModalArticleData>
                  )}
                </ModalArticleInfosDataContainer>
              </ModalArticleInfos>
            )}
          </ModalForm>
        </ModalSection3x2>

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
