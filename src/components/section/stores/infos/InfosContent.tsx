import { styled } from "styled-components";
import { color } from "../../../../utils/color";

const InfosContent = () => {
  return (
    <Container>
      <InfosContentImageContainer>
        <InfosContentImage />
      </InfosContentImageContainer>
      <InfosContentCardRounded>
        <span>QUANTITÉ</span>
        <span>200</span>
      </InfosContentCardRounded>
      <InfosContentCardRounded>
        <span>Total</span>
        <span>2</span>
      </InfosContentCardRounded>
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

const InfosContentCardRounded = styled.div`
  display: inline-block;
  padding: 0.5rem;
  border-radius: 40px;
  margin-right: 1rem;
  background: ${color.blue2};
  color: ${color.darkBlue};
  & > span:first-child {
    font-size: 1rem;
    font-weight: 700;
    margin-right: 10px;
  }
  & > span:last-child {
    font-weight: 500;
    font-size: 0.9rem;
    margin-right: 10px;
  }
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
