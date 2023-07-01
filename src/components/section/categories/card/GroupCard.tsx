import styled from "styled-components";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../../../redux/store";
import { color } from "../../../../utils/color";
import { getCategories } from "../../../../redux/features/category";

const GroupCard = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.datas);

  useEffect(() => {
    getCategories()(dispatch);
  }, []);

  return (
    <Container>
      <Card title="Categorie enregistrée" value={categories?.length || 0} />
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
