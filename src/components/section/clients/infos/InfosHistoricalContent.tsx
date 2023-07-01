import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../../../redux/store";
import { getHistory } from "../../../../redux/features/client";
import HistoricalStock from "../../../historical/HistoricalStock";

const InfosHistoricalContent = () => {
  const histories = useSelector((state: RootState) => state.client.history);
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
