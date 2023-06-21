import { styled } from "styled-components";
import { color } from "../../utils/color";
import { IoSearch } from "react-icons/io5";

const SimpleSearchBard = () => {
  return (
    <Container>
      <SearchIcon>
        <IoSearch size={25} />
      </SearchIcon>
      <SearchText type="text" />
    </Container>
  );
};

export const Container = styled.div`
  width: 250px;
  height: 40px;
  border-radius: 40px;
  background-color: ${color.lightBlue};
  align-items: center;
  padding: 0.2rem 0.3rem;
  display: grid;
  grid-template-columns: 35px 1fr;
`;

export const SearchIcon = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #fff;
  color: ${color.darkBlue};
`;

export const SearchText = styled.input`
  width: 100%;
  height: 100%;
  background: ${color.lightBlue};
  border: 1px solid ${color.lightBlue};
  color: ${color.darkBlue};
  padding-right: 0.5rem;
  &:focus {
    outline: none;
  }
`;
export default SimpleSearchBard;
