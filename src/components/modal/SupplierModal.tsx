import { styled } from "styled-components";
import { color } from "../../utils/color";

const SupplierModal = () => {
  return <Container>hello</Container>;
};

const Container = styled.div`
  border: 1px solid ${color.darkBlue};
  border-radius: 5px;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export default SupplierModal;
