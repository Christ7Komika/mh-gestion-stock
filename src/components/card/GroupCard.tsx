import styled from "styled-components";
import Card from "./Card";
import { color } from "../../utils/color";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { getStores } from "../../redux/features/stores";

const GroupCard = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.store.datas);

  useEffect(() => {
    getStores()(dispatch);
  }, []);

  return (
    <Container>
      <Card title="Articles en stock" value={articles?.length || 0} />
      <Card title="Articles en fin de stock" value={articles?.length || 0} />
      <Card title="Articles vendus" value={articles?.length || 0} />
      <Card title="Articles non vendus" value={articles?.length || 0} />
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
