import { styled } from "styled-components";
import { color } from "../../utils/color";

interface OptionProps {
  action: "delete" | "update" | "add" | "remove";
}

interface TRowProps {
  selected?: boolean;
}

export const TableContainer = styled.div`
  width: 100%;

  & table {
    width: 100%;
    border-collapse: collapse;
    position: relative;
  }
`;

export const TableHeader = styled.thead`
  border-bottom: 10px solid #fff;
  position: sticky;
  top: 154px;
  left: 0;
  background: #fff;
  backdrop-filter: blur(1000px);
  z-index: 2;
`;
export const THead = styled.th`
  font-size: 1rem;
  font-weight: 500;
  color: ${color.darkBlue};
  text-align: center;
  padding-inline: 0.4rem;
  background: #fff;
  backdrop-filter: blur(1000px);
`;
export const THRow = styled.tr`
  height: 50px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(1000px);
  position: relative;
  appearance: none;
  z-index: 2;
`;
export const TRow = styled.tr<TRowProps>`
  appearance: none;
  height: 50px;
  outline: ${({ selected }) =>
    selected === true && "2px solid " + color.selectedBorder};
  border-top: 10px solid #fff;
  border-bottom: 10px solid #fff;
  transition: linear 0.4s;
`;

export const TDImg = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  object-position: center center;
  background-color: ${color.grey};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TData = styled.td`
  text-align: center;
  font-size: 0.8rem;
  position: relative;
  padding-inline: 5px;
`;

export const TableBody = styled.tbody`
  margin-top: 0.5rem;
  & tr {
    background: ${color.fadeBlue};
  }
  & tr:nth-child(even) {
    background: ${color.grey};
  }
`;

export const OptionGroup = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 5px;
`;

export const Option = styled.div<OptionProps>`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ action }) =>
    action === "delete"
      ? color.red
      : action === "update"
      ? color.blue
      : action === "add"
      ? color.green
      : color.orange};
  color: ${({ action }) =>
    action === "delete"
      ? color.darkRed
      : action === "update"
      ? color.darkSkyBlue
      : action === "add"
      ? color.darkGreen
      : color.darkOrange};
  transition: linear 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
