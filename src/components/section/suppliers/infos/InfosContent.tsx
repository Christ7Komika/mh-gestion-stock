import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import { SupplierType } from "../../../../redux/features/supplier";

interface Props {
  supplier: SupplierType | null;
}

const InfosContent = ({ supplier }: Props) => {
  return (
    <Container>
      {supplier?.logo && (
        <InfosContentImageContainer>
          <InfosContentImage src={supplier?.logo} />
        </InfosContentImageContainer>
      )}
      {supplier?.name && (
        <InfosContentCard>
          <InfosContentCardTitle>NOM</InfosContentCardTitle>
          <InfosContentCardText>{supplier?.name}</InfosContentCardText>
        </InfosContentCard>
      )}
      {supplier && supplier.phone && (
        <InfosContentCard>
          <InfosContentCardTitle>TÉLÉPHONE</InfosContentCardTitle>
          <InfosContentCardText>{supplier.phone}</InfosContentCardText>
        </InfosContentCard>
      )}
      {supplier && supplier.email && (
        <InfosContentCard>
          <InfosContentCardTitle>EMAIL</InfosContentCardTitle>
          <InfosContentCardText>{supplier.email}</InfosContentCardText>
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
`;

const InfosContentCard = styled.div`
  padding: 1rem;
  background: ${color.fadeBlue};
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
  border-radius: 5px;
`;

const InfosContentCardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${color.darkBlue};
  text-transform: uppercase;
`;
const InfosContentCardText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${color.darkBlue};
  text-transform: uppercase;
`;

export default InfosContent;
