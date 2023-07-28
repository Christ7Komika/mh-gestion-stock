import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import { StoreType } from "../../../../redux/features/stores";
import { getImagePath } from "../../../../utils/image";

interface Props {
  store: StoreType | null;
}

const InfosContent = ({ store }: Props) => {
  function formatNumberWithSpaces(quantity: string, sellingPrice: string) {
    const value =
      parseFloat(quantity) * parseFloat(sellingPrice.replace(" ", ""));
    let str = value.toString();
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return (
    <Container>
      {store?.image && (
        <InfosContentImageContainer>
          <InfosContentImage src={getImagePath(store?.image)} />
        </InfosContentImageContainer>
      )}
      {store?.quantity && (
        <InfosContentCard>
          {store.hasLength ? (
            <>
              <InfosContentCardTitle>LONGUEUR</InfosContentCardTitle>
              <InfosContentCardText>
                {store.quantity} mètre(s)
              </InfosContentCardText>
            </>
          ) : (
            <>
              <InfosContentCardTitle>QUANTITÉ(S)</InfosContentCardTitle>
              <InfosContentCardText>{store.quantity}</InfosContentCardText>
            </>
          )}
        </InfosContentCard>
      )}
      {store?.purchasePrice && (
        <InfosContentCard>
          <InfosContentCardTitle>PRIX TTC</InfosContentCardTitle>
          <InfosContentCardText>
            {store.purchasePrice} FCFA
          </InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.unitPrice && (
        <InfosContentCard>
          <InfosContentCardTitle>PRIX UNITAIRE</InfosContentCardTitle>
          <InfosContentCardText>{store.unitPrice} FCFA</InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.quantity && store.sellingPrice && (
        <InfosContentCard>
          <InfosContentCardTitle>
            SOMME TOTAL EN STOCK NON VENDU
          </InfosContentCardTitle>
          <InfosContentCardText>
            {formatNumberWithSpaces(store.quantity, store.sellingPrice)} FCFA
          </InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.Warehouse && (
        <InfosContentCard>
          <InfosContentCardTitle>ZONE DE STOCKAGE</InfosContentCardTitle>
          <InfosContentCardText>{store.Warehouse.name}</InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.Category && (
        <InfosContentCard>
          <InfosContentCardTitle>CATÉGORIE</InfosContentCardTitle>
          <InfosContentCardText>{store.Category.name}</InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.Supplier && (
        <InfosContentCard>
          <InfosContentCardTitle>FOURNISSEUR</InfosContentCardTitle>
          <InfosContentCardText>{store.Supplier.name}</InfosContentCardText>
        </InfosContentCard>
      )}

      {store?.name && (
        <InfosContentCard>
          <InfosContentCardTitle>NOM</InfosContentCardTitle>
          <InfosContentCardText>{store?.name}</InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.code && (
        <InfosContentCard>
          <InfosContentCardTitle>CODE</InfosContentCardTitle>
          <InfosContentCardText>{store?.code}</InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.reference && (
        <InfosContentCard>
          <InfosContentCardTitle>RÉFÉRENCE</InfosContentCardTitle>
          <InfosContentCardText>{store?.reference}</InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.designation && (
        <InfosContentCard>
          <InfosContentCardTitle>DÉSIGNATION</InfosContentCardTitle>
          <InfosContentCardText>{store?.designation}</InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.lotNumber && (
        <InfosContentCard>
          <InfosContentCardTitle>NUMÉRO LOT</InfosContentCardTitle>
          <InfosContentCardText>{store?.lotNumber}</InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.type && (
        <InfosContentCard>
          <InfosContentCardTitle>TYPE</InfosContentCardTitle>
          <InfosContentCardText>{store?.type}</InfosContentCardText>
        </InfosContentCard>
      )}

      {store?.operatingPressure && (
        <InfosContentCard>
          <InfosContentCardTitle>PRESSION DE SERVICE</InfosContentCardTitle>
          <InfosContentCardText>
            {store?.operatingPressure}
          </InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.diameter && (
        <InfosContentCard>
          <InfosContentCardTitle>DIAMÈTRE</InfosContentCardTitle>
          <InfosContentCardText>{store?.diameter}</InfosContentCardText>
        </InfosContentCard>
      )}
      {store?.fluid && (
        <InfosContentCard>
          <InfosContentCardTitle>FLUIDE</InfosContentCardTitle>
          <InfosContentCardText>{store?.fluid}</InfosContentCardText>
        </InfosContentCard>
      )}
    </Container>
  );
};

const Container = styled.div`
  & > div {
    margin-bottom: 1rem;
  }
`;

const InfosContentImageContainer = styled.div`
  width: 100%;
  height: 150px;
  border: 1px solid ${color.border};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfosContentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  border: 1px solid ${color.grey};
  padding: 5px;
  border-radius: 5px;
`;

const InfosContentCard = styled.div`
  padding: 0.4rem;
  background: ${color.fadeBlue};
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
  border-radius: 5px;
`;

const InfosContentCardTitle = styled.h2`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${color.darkBlue};
  text-transform: uppercase;
  background-color: ${color.grey};
  border-radius: 5px;
  padding: 5px;
`;
const InfosContentCardText = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${color.darkBlue};
  text-transform: uppercase;
  padding: 5px;
`;

export default InfosContent;
