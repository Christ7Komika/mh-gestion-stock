import styled from "styled-components";
import { color } from "../../utils/color";

const InfosHeader = () => {
  return (
    <Container>
      <ColorLine />
      <InfosHeaderColumnContent>
        <InfosHeaderTitle>Aperçu fournisseur</InfosHeaderTitle>
        <InfosHeaderDate>18/06/2023</InfosHeaderDate>
      </InfosHeaderColumnContent>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: 20px 1fr;
  column-gap: 0.5rem;
`;

const ColorLine = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: ${color.fadeBlue};
`;

const InfosHeaderColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0.5rem;
`;

const InfosHeaderTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 900;
  color: ${color.darkBlue};
  text-transform: uppercase;
`;

const InfosHeaderDate = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${color.darkBlue};
  text-transform: uppercase;
`;

export default InfosHeader;
