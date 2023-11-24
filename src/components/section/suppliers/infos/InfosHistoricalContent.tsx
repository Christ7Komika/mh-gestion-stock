import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getHistory } from "../../../../redux/features/supplier";
import { RootState } from "../../../../redux/store";
import HistoricalStock from "../../../historical/HistoricalStock";

const InfosHistoricalContent = () => {
  const histories = useSelector((state: RootState) => state.supplier.history);
  const dispatch = useDispatch();

  useEffect(() => {
    getHistory()(dispatch);
  }, []);

  return (
    <Container>
      {histories?.map((history) => {
        if (history.state === "Ajout") {
          return <HistoricalStock status="add" history={history} />;
        }
        if (history.state === "Modification") {
          return <HistoricalStock status="update" history={history} />;
        }
        if (history.state === "Suppression") {
          return <HistoricalStock status="delete" history={history} />;
        }
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export default InfosHistoricalContent;
