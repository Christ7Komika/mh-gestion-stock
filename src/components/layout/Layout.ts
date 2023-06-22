import styled from "styled-components";
import { color } from "../../utils/color";

export const SectionX3 = styled.main`
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  height: calc(100vh - 115px);
  column-gap: 1rem;
`;

export const Section = styled.section`
  background: #fff;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  & > div {
    padding: 1rem;
  }
  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${color.border};
    border-radius: 5px;
  }
`;
