import styled from "styled-components";
import { color } from "../../utils/color";

interface SectionProps {
  empty?: true;
}

export const SectionX3 = styled.main`
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  height: calc(100vh - 115px);
  column-gap: 1rem;
`;

export const Section = styled.section<SectionProps>`
  background: ${({ empty }) => (empty ? "#F3F5F7" : "#fff")};
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
  gap: 0.5rem;
`;

export const ModalSection3x2 = styled.section`
  display: grid;
  grid-template-columns: 430px 530px;
  gap: 1rem;
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
  width: 100%;
`;

export const ModalMessageError = styled.p`
  padding: 0.4rem;
  border-radius: 5px;
  background: ${color.lightRed};
  color: ${color.darkBlue};
  font-size: 0.75rem;
`;

export const ModalDoubleFormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.5rem;
  width: 300px;
`;
export const ModalTripleFormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 0.5rem;
  width: 300px;
`;

export const ModalGroupButton = styled.div`
  display: flex;
  width: 100%;
  column-gap: 0.5rem;
`;

export const ModalInputGroup = styled.div`
  width: 100%;
  height: 50px;
  padding-inline: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-radius: 50px;
`;

export const ModalInfosTitle = styled.h2`
  width: 300px;
  height: 60px;
  border-radius: 5px;
  background: ${color.fadeBlue};
  color: ${color.darkBlue};
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 60px;
  text-align: center;
`;

export const ModalInfosContent = styled.p`
  width: 100%;
  border-radius: 5px;
  height: auto;
  background: ${color.lightBlue};
  font-size: 0.9rem;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const ModalStockInfos = styled.div`
  width: 100%;
  display: flex;
  column-gap: 1rem;
`;
export const ModalStockInfosData = styled.p`
  padding: 0.5rem 1.5rem;
  height: 35px;
  border-radius: 35px;
  background: ${color.fadeBlue};
  color: ${color.darkBlue};
  font-size: 0.9rem;
`;

export const ModalValidButton = styled(ModalButton)`
  border: 1px solid ${color.green};
  background: ${color.green};
  color: ${color.darkGreen};
  display: flex;
  justify-content: center;
`;
export const ModalCancelButton = styled(ModalButton)`
  border: 1px solid ${color.red};
  background: ${color.red};
  color: ${color.darkRed};
`;

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff3e;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  border: 1px solid ${color.darkBlue};
  border-radius: 5px;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export const SearchButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: ${color.darkBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const ModalTableContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  background: ${color.fadeBlue};
  border-radius: 5px;
  padding: 0.4rem;

  & p {
    font-size: 0.75rem;
  }
`;

export const ModalTableHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px;
  & p:last-child {
    text-align: center;
  }
`;

export const ModalDataContainer = styled.div`
  width: 100%;
  height: 250px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;

  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${color.darkBlue};
    border-radius: 5px;
  }
`;

export const ModalDataContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 5px;
  padding: 0.25rem;
  gap: 0.5rem;
`;

export const ModalDataInfos = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px;
  column-gap: 0.5rem;
  align-items: center;

  & p:last-child {
    text-align: center;
  }
`;

export const ModalDataForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px 30px 30px;
  gap: 5px;
`;

export const ModalDataInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  background: ${color.lightBlue};
  padding-inline: 5px;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const ModalDataInputButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalDataInputAdd = styled(ModalDataInputButton)<{
  disabled?: boolean;
}>`
  background: ${({ disabled }) => (disabled ? color.grey : color.lightGreen)};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  &:hover {
    opacity: 0.8;
  }
`;
export const ModalDataInputReset = styled(ModalDataInputButton)`
  background: ${color.darkBlue};
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const ModalArticleInfos = styled.div`
  width: 100%;
  padding: 5px;
  background: ${color.fadeBlue};
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 5px;
`;

export const ModalArticleInfosDataContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${color.darkBlue};
    border-radius: 5px;
  }
`;

export const ModalArticleInfosHead = styled.div`
  display: flex;
  justify-content: space-between;
  & p {
    font-size: 0.8rem;
  }
`;

export const ModalArticleData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: #fff;
  border-radius: 5px;
  padding: 5px;

  & p {
    font-size: 0.8rem;
    color: ${color.darkBlue};
  }
`;

export const ModalAddArticleContainer = styled.div`
  width: 100%;
  height: 245px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${color.darkBlue};
    border-radius: 5px;
  }
`;

export const ModalDataAddArticle = styled.div`
  width: 100%;
  border-radius: 5px;
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr 20px;
  gap: 5px;
  background: ${color.fadeBlue};
`;

export const ModalDataInfosArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & p {
    font-size: 0.8rem;
  }
`;

export const ModalDataInfosArticleRemoveContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalDataInfosArticleRemove = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: ${color.lightRed};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: linear 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
