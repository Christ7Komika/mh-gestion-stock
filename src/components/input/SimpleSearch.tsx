import { styled } from "styled-components";
import { color } from "../../utils/color";
import { useEffect, useState } from "react";

interface Props {
  setSearch: Function;
}

const SimpleSearch = ({ setSearch }: Props) => {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    setSearch(text);
  }, [text]);
  return (
    <Container>
      <SearchText
        type="text"
        placeholder="Désignation ou nom de l'article"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
      />
    </Container>
  );
};

export const Container = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 40px;
  background-color: ${color.lightBlue};
  align-items: center;
  padding: 0.2rem 0.3rem;
`;

export const SearchText = styled.input`
  width: 100%;
  height: 100%;
  background: ${color.lightBlue};
  border: 1px solid ${color.lightBlue};
  color: ${color.darkBlue};
  border-radius: 30px;
  padding-inline: 0.5rem;
  &:focus {
    outline: none;
  }
`;
export default SimpleSearch;
