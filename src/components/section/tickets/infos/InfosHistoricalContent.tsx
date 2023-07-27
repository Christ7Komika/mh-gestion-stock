import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../../../redux/store";
import HistoricalStock from "../../../historical/HistoricalStock";
import { getHistory } from "../../../../redux/features/ticket";

const InfosHistoricalContent = () => {
  const histories = useSelector((state: RootState) => state.ticket.history);
  const dispatch = useDispatch();

  useEffect(() => {
    getHistory()(dispatch);
  }, []);

  return (
    <Container>
      {histories?.map((history) => {
        if (history.state === "Ajout") {
          return (
            <HistoricalStock
              status="add"
              history={history}
              key={"add" + history.id}
            />
          );
        }
        if (history.state === "Création") {
          return (
            <HistoricalStock
              status="add"
              history={history}
              key={"add" + history.id}
            />
          );
        }
        if (history.state === "Modification") {
          return (
            <HistoricalStock
              status="update"
              history={history}
              key={"update" + history.id}
            />
          );
        }
        if (history.state === "Suppression") {
          return (
            <HistoricalStock
              status="delete"
              history={history}
              key={"delete" + history.id}
            />
          );
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
