import { styled } from "styled-components";
import { color } from "../../utils/color";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Loader } from "../loader/Loader";

interface Props {
  setSearch: Function;
  isValid: Function;
  defaultValue?: string;
}

const SimpleSearchBard = ({ setSearch, isValid, defaultValue }: Props) => {
  const [text, setText] = useState<string>("");
  const isLoad = useSelector((state: RootState) => state.client.isLoad);

  useEffect(() => {
    if (defaultValue) {
      setText(defaultValue);
    }
  }, [defaultValue]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setSearch(text);
    isValid(true);
  };

  return (
    <Container>
      <SearchIcon onClick={submit}>
        {isLoad ? <Loader /> : <IoSearch size={25} />}
      </SearchIcon>
      <SearchText
        type="text"
        value={text}
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
  color: ${color.darkBlue};
  cursor: pointer;
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
export default SimpleSearchBard;
