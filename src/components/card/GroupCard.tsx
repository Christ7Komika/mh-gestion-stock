import styled from "styled-components";
import Card from "./Card";
import { color } from "../../utils/color";

const GroupCard = () => {
  return (
    <Container>
      <Card />
      <Card />
      <Card />
      <Card />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${color.border};
`;

export default GroupCard;
