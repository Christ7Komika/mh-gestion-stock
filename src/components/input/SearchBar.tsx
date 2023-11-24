import { styled } from "styled-components";
import { color } from "../../utils/color";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Loader } from "../loader/Loader";

interface Props {
  setSearch: Function;
}

const SearchBar = ({ setSearch }: Props) => {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    setSearch(text);
  }, [text]);
  return (
    <Container>
      <SearchIcon>
        <IoSearch size={20} />
      </SearchIcon>
      <SearchText
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
      />
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
  border: 1px solid ${color.darkBlue};
  color: ${color.darkBlue};
`;

export const SearchText = styled.input`
  width: 100%;
  height: 100%;
  background: ${color.lightBlue};
  border: 1px solid ${color.lightBlue};
  color: ${color.darkBlue};
  border-radius: 30px;
  padding-right: 0.5rem;
  &:focus {
    outline: none;
  }
`;
export default SearchBar;
