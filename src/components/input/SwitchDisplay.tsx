import styled from "styled-components";
import { color } from "../../utils/color";
import { RiFileList2Fill } from "react-icons/ri";
import { CgMenuGridR } from "react-icons/cg";
import { useEffect, useState } from "react";

interface Props {
  isDisplay: Function;
}

const SwitchDisplay = ({ isDisplay }: Props) => {
  const [switchTo, setSwitchTo] = useState(false);
  const [listView, setListView] = useState(false);
  const [cardView, setCardView] = useState(false);

  useEffect(() => {
    if (switchTo) {
      setListView(false);
      setCardView(true);
    } else {
      setListView(true);
      setCardView(false);
    }
  }, [switchTo]);

  useEffect(() => {
    isDisplay(switchTo);
  }, [switchTo]);

  return (
    <Container
      onClick={() => {
        setSwitchTo(!switchTo);
      }}
    >
      <BoxIcon isActive={listView}>
        <RiFileList2Fill size={20} />
      </BoxIcon>
      <BoxIcon isActive={cardView}>
        <CgMenuGridR size={20} />
      </BoxIcon>
      <Selector isMove={switchTo} />
    </Container>
  );
};

interface MoveTo {
  isMove: boolean;
}

interface Box {
  isActive: boolean;
}

export const Container = styled.div`
  width: 75px;
  height: 40px;
  border-radius: 40px;
  background: ${color.darkBlue};
  border: 1px solid ${color.darkBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;
  padding-inline: 0.5rem;
  transition: linear 0.2s;
  position: relative;
  cursor: pointer;
  transition: linear 0.4s;
  &:hover {
    opacity: 0.8;
  }
`;

export const BoxIcon = styled.div<Box>`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  color: ${({ isActive }) => (isActive ? color.darkBlue : "#fff")};
  transition: linear 0.2s;
`;

export const Selector = styled.div<MoveTo>`
  position: absolute;
  top: 50%;
  left: ${({ isMove }) => (isMove ? "40px" : "5px")};
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: #fff;
  transform: translateY(-50%);
  z-index: 1;
  transition: linear 0.2s;
`;

export default SwitchDisplay;
