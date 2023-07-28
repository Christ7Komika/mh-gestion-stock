import styled from "styled-components";
import { color } from "../../utils/color";
import { useEffect, useState } from "react";
import InputText from "./InputText";

interface Props {
  getData: Function;
  isLength: Function;
  error: string | null;
}

const SwitchData = ({ getData, isLength, error }: Props) => {
  const [switchTo, setSwitchTo] = useState(false);
  const [data, setData] = useState<string>("");

  useEffect(() => {
    getData(data);
  }, [data]);

  useEffect(() => {
    if (switchTo) {
      isLength(true);
    } else {
      isLength(false);
    }
  }, [switchTo]);

  return (
    <Container>
      <Row>
        <Text>Quantité</Text>
        <Switch
          onClick={() => {
            setSwitchTo(!switchTo);
          }}
        >
          <BoxIcon></BoxIcon>
          <BoxIcon></BoxIcon>
          <Selector isMove={switchTo} />
        </Switch>
        <Text>Longueur</Text>
      </Row>
      <SwitchContainer>
        {switchTo ? (
          <InputText
            name=""
            id="length"
            defaultValue={data}
            setValue={setData}
            error={error || ""}
            placeholder="Inserer la longueur de l'article"
          />
        ) : (
          <InputText
            name=""
            id="quantity"
            defaultValue={data}
            setValue={setData}
            error={error || ""}
            placeholder="Inserer la quantité de l'article"
          />
        )}
      </SwitchContainer>
    </Container>
  );
};

interface MoveTo {
  isMove: boolean;
}

export const Text = styled.small`
  font-size: 0.9rem;
  color: ${color.darkBlue};
  font-weight: 700;
`;
export const Container = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
`;

export const SwitchContainer = styled.div`
  width: 100%;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

export const Switch = styled.div`
  width: 35px;
  height: 20px;
  border-radius: 20px;
  background: ${color.darkBlue};
  border: 1px solid ${color.darkBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;
  padding-inline: 0.5rem;
  cursor: pointer;
  transition: linear 0.2s;
  position: relative;
`;

export const BoxIcon = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  transition: linear 0.2s;
`;

export const Selector = styled.div<MoveTo>`
  position: absolute;
  top: 50%;
  left: ${({ isMove }) => (isMove ? "20px" : "5px")};
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: #fff;
  transform: translateY(-50%);
  z-index: 1;
  transition: linear 0.2s;
`;

export default SwitchData;
