import { styled } from "styled-components";
import { color } from "../../utils/color";

const InfosContent = () => {
  return (
    <Container>
      <InfosContentImageContainer>
        {/* <InfosContentImage /> */}
      </InfosContentImageContainer>
      <InfosContentCard>
        <InfosContentCardTitle>NOM</InfosContentCardTitle>
        <InfosContentCardText>
          RACCORD A CAMES MALE TYPE E DN 100 ANNELEE 4" LAITON
        </InfosContentCardText>
      </InfosContentCard>
      <InfosContentCard>
        <InfosContentCardTitle>NOM</InfosContentCardTitle>
        <InfosContentCardText>
          RACCORD A CAMES MALE TYPE E DN 100 ANNELEE 4" LAITON
        </InfosContentCardText>
      </InfosContentCard>
      <InfosContentCard>
        <InfosContentCardTitle>NOM</InfosContentCardTitle>
        <InfosContentCardText>
          RACCORD A CAMES MALE TYPE E DN 100 ANNELEE 4" LAITON
        </InfosContentCardText>
      </InfosContentCard>
      <InfosContentCard>
        <InfosContentCardTitle>NOM</InfosContentCardTitle>
        <InfosContentCardText>
          RACCORD A CAMES MALE TYPE E DN 100 ANNELEE 4" LAITON
        </InfosContentCardText>
      </InfosContentCard>
      <InfosContentCard>
        <InfosContentCardTitle>NOM</InfosContentCardTitle>
        <InfosContentCardText>
          RACCORD A CAMES MALE TYPE E DN 100 ANNELEE 4" LAITON
        </InfosContentCardText>
      </InfosContentCard>
      <InfosContentCard>
        <InfosContentCardTitle>NOM</InfosContentCardTitle>
        <InfosContentCardText>
          RACCORD A CAMES MALE TYPE E DN 100 ANNELEE 4" LAITON
        </InfosContentCardText>
      </InfosContentCard>
      <InfosContentCard>
        <InfosContentCardTitle>NOM</InfosContentCardTitle>
        <InfosContentCardText>
          RACCORD A CAMES MALE TYPE E DN 100 ANNELEE 4" LAITON
        </InfosContentCardText>
      </InfosContentCard>
      <InfosContentCard>
        <InfosContentCardTitle>NOM</InfosContentCardTitle>
        <InfosContentCardText>
          RACCORD A CAMES MALE TYPE E DN 100 ANNELEE 4" LAITON
        </InfosContentCardText>
      </InfosContentCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const InfosContentImageContainer = styled.div`
  width: 100%;
  height: 150px;
  border: 1px solid ${color.border};
  border-radius: 5px;
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
  font-size: 1.2rem;
  font-weight: 600;
  color: ${color.darkBlue};
  text-transform: uppercase;
`;
const InfosContentCardText = styled.h2`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${color.darkBlue};
  text-transform: uppercase;
`;

export default InfosContent;
