import styled from "styled-components";

interface Props {
  color?: string;
}

export const Loader = styled.div<Props>`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  border-top: 4px dotted ${({ color }) => (color ? color : "#000")};
  border-left: 4px dotted ${({ color }) => (color ? color : "#000")};
  border-right: 4px dotted ${({ color }) => (color ? color : "#000")};
  border-bottom: 4px dotted ${({ color }) => (color ? color : "#000")};
  animation: loader infinite 1.5s linear;
  @keyframes loader {
    to {
      transform: rotate(1turn);
    }
  }
`;
