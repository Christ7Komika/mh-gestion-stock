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

/**
 * MODAL
 */

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 2rem;
  height: 35px;
`;

export const ModalSection3 = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 330px);
`;

export const ModalHeaderTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${color.darkBlue};
`;

export const ModalHeaderExit = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: ${color.red};
  color: ${color.darkRed};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
`;

export const ModalGroupButton = styled.div`
  display: flex;
  width: 100%;
  column-gap: 0.5rem;
`;

export const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: linear 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const ModalValidButton = styled(ModalButton)`
  border: 1px solid ${color.green};
  background: ${color.green};
  color: ${color.darkGreen};
`;
export const ModalCancelButton = styled(ModalButton)`
  border: 1px solid ${color.red};
  background: ${color.red};
  color: ${color.darkRed};
`;
