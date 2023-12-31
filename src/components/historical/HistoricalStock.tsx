import { styled } from "styled-components";
import { color } from "../../utils/color";
import { History } from "../../redux/features/stores";

interface Props {
  status: "add" | "update" | "delete";
  history: History;
}

const HistoricalStock = ({ status, history }: Props) => {
  return (
    <Container status={status}>
      <HistoricalStockHeader>
        {status === "add" ? (
          <HistoricalStockStatusAdd>Ajout</HistoricalStockStatusAdd>
        ) : status === "update" ? (
          <HistoricalStockStatusUpdate>
            Modification
          </HistoricalStockStatusUpdate>
        ) : (
          <HistoricalStockStatusDelete>Suppression</HistoricalStockStatusDelete>
        )}
        <HistoricalStockDate>
          {new Date(history.createdAt).toLocaleDateString()}
        </HistoricalStockDate>
      </HistoricalStockHeader>

      <HistoricalStockTextGroup>
        <HistoricalStockText>{history.message}</HistoricalStockText>
      </HistoricalStockTextGroup>
      <HistoricalStockTextGroup>
        {history.Comment && (
          <>
            <HistoricalStockRapportTitle>
              Commentaire
            </HistoricalStockRapportTitle>
            <HistoricalStockText>{history.Comment.message}</HistoricalStockText>
          </>
        )}
      </HistoricalStockTextGroup>
    </Container>
  );
};

interface ContainerProps {
  status: "add" | "update" | "delete";
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
  border-radius: 5px;
  padding: 0.5rem;
  background: ${({ status }) =>
    status === "add"
      ? color.lightGreen
      : status === "update"
      ? color.lightOrange
      : color.lightRed};
`;

const HistoricalStockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
`;

const HistoricalStockStatus = styled.p`
  height: 25px;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const HistoricalStockStatusAdd = styled(HistoricalStockStatus)`
  background: ${color.green};
`;
const HistoricalStockStatusUpdate = styled(HistoricalStockStatus)`
  background: ${color.orange};
`;
const HistoricalStockStatusDelete = styled(HistoricalStockStatus)`
  background: ${color.red};
`;

const HistoricalStockDate = styled.small`
  color: ${color.darkBlue};
`;

const HistoricalStockContent = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  column-gap: 0.5rem;
`;

const HistoricalStockImgContainer = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${color.border};
  border-radius: 5px;
  background: #f3f5f7;
`;

const HistoricalStockImg = styled.img`
  width: 100%;
  height: 100px;
  object-fit: contain;
  object-position: center center;
`;

const HistoricalStockTextContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
`;

const HistoricalStockTextGroup = styled(HistoricalStockTextContent)``;

const HistoricalStockText = styled.p`
  font-size: 0.8rem;
  color: ${color.darkBlue};

  & span {
    font-weight: 600;
  }
`;
const HistoricalStockRapportTitle = styled(HistoricalStockText)`
  font-weight: 600;
`;

export default HistoricalStock;
