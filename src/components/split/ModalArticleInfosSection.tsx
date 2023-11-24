import { StoreType } from "../../redux/features/stores";
import {
  ModalArticleData,
  ModalArticleInfosHead,
  ModalArticleInfosDataContainer,
  ModalArticleInfos,
} from "../layout/Layout";

interface Props {
  article: StoreType;
}

const ModalArticleInfosSection = ({ article }: Props) => {
  return (
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
  );
};

export default ModalArticleInfosSection;
