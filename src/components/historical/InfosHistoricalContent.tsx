import { styled } from "styled-components";
import HistoricalStock from "./HistoricalStock";

const InfosHistoricalContent = () => {
  return (
    <Container>
      <HistoricalStock status="add" />
      <HistoricalStock status="update" />
      <HistoricalStock status="delete" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export default InfosHistoricalContent;
