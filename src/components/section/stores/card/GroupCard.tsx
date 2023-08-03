import styled from "styled-components";
import Card from "./Card";
import { color } from "../../../../utils/color";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { StoreType, getStores } from "../../../../redux/features/stores";

const GroupCard = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.store.datas);
  const [endStock, setEndStock] = useState<StoreType[] | []>([]);

  useEffect(() => {
    if (articles) {
      setEndStock([
        ...articles.filter((data) => parseFloat(data.quantity) <= 15),
      ]);
    }
  }, [articles]);

  useEffect(() => {
    getStores()(dispatch);
  }, []);

  return (
    <Container>
      {articles && (
        <>
          <Card title="Total article enregistré" value={articles.length || 0} />
          {endStock && (
            <Card title="Total en fin de stock" value={endStock.length || 0} />
          )}
        </>
      )}
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
