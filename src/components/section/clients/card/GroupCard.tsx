import styled from "styled-components";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getClients } from "../../../../redux/features/client";
import { RootState } from "../../../../redux/store";
import { color } from "../../../../utils/color";

const GroupCard = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state: RootState) => state.client.datas);

  useEffect(() => {
    getClients()(dispatch);
  }, []);

  return (
    <Container>
      <Card title="Client enregistré" value={clients?.length || 0} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${color.border};
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 3;
`;

export default GroupCard;
