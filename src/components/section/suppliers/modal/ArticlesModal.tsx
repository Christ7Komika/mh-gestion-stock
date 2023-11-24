import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import {
  ModalCancelButton,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalValidButton,
  SpaceBox,
  Button,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";
import {
  TData,
  THRow,
  THead,
  TRow,
  TableBody,
  TableContainer,
  TableHeader,
  EmptyText,
  LoaderGrid,
} from "../../../layout/table";
import { getStoresBySupplier } from "../../../../redux/features/stores";
import SimpleSearchBard from "../../../input/SimpleSearchBard";
import Skeleton from "react-loading-skeleton";
interface Props {
  setAction: Function;
}

const ArticlesModal = ({ setAction }: Props) => {
  const [step] = useState<number>(9);
  const [skip, setSkip] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLastPrev, setIsLastPrev] = useState<boolean>(true);
  const [isLastNext, setIsLastNext] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentId = useSelector((state: RootState) => state.supplier.currentId);
  const articles = useSelector((state: RootState) => state.store.SupplierStore);
  const count = useSelector((state: RootState) => state.store.count);
  const isLoad = useSelector(
    (state: RootState) => state.store.isLoadBySupplier
  );
  const isLoadSupplier = useSelector(
    (state: RootState) => state.supplier.currentId
  );

  useEffect(() => {
    if (currentId) {
      getStoresBySupplier(currentId, step, skip, "empty")(dispatch);
    }
  }, [currentId]);

  useEffect(() => {
    if (skip <= 0) {
      return setIsLastPrev(true);
    }
    setIsLastPrev(false);
    if (currentId) {
      const searchValue = search ? search : "empty";
      getStoresBySupplier(currentId, step, skip, searchValue)(dispatch);
    }
  }, [skip, count]);

  useEffect(() => {
    if (isValid && search) {
      if (currentId) {
        getStoresBySupplier(currentId, 9, 0, search)(dispatch);
      }
    }

    if (isValid && !search) {
      if (currentId) {
        getStoresBySupplier(currentId, 9, 0, "empty")(dispatch);
      }
    }
  }, [search, isValid]);

  useEffect(() => {
    if (skip >= count || count - skip <= 9) {
      return setIsLastNext(true);
    }

    setIsLastNext(false);
    if (currentId) {
      const searchValue = search ? search : "empty";
      getStoresBySupplier(currentId, step, skip, searchValue)(dispatch);
    }
  }, [skip, count]);

  const handlePrev = () => {
    if (isLastPrev) {
      return;
    }
    if (skip <= 0) {
      return setIsLastPrev(true);
    }
    setSkip(skip - step);
  };

  const handleNext = () => {
    if (isLastNext) {
      return;
    }
    if (skip >= count) {
      return setIsLastNext(true);
    }
    setSkip(skip + step);
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Articles</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        {isLoad && isLoadSupplier ? (
          <LoaderGrid>
            <Skeleton count={4} height={140} />
          </LoaderGrid>
        ) : (
          <>
            {count === 0 ? (
              <>
                <SpaceBox>
                  <SimpleSearchBard
                    setSearch={setSearch}
                    isValid={setIsValid}
                    defaultValue={search}
                  />
                  <Button>Article(s) trouvé(s) : {count} </Button>
                </SpaceBox>
                <EmptyText>Oups ! Aucun article trouvé.</EmptyText>
              </>
            ) : (
              <>
                <SpaceBox>
                  <SimpleSearchBard
                    setSearch={setSearch}
                    isValid={setIsValid}
                    defaultValue={search}
                  />
                  <Button>Article(s) trouvé(s) : {count} </Button>
                </SpaceBox>
                <Table>
                  <TableContainer>
                    <table>
                      <TableHead>
                        <THRow>
                          <THead>Code</THead>
                          <THead>Désignation</THead>
                          <THead>Catégorie</THead>
                          <THead>Stockage</THead>
                          <THead>Fournisseur</THead>
                          <THead>Q/L</THead>
                          <THead>Prix Unitaire</THead>
                        </THRow>
                      </TableHead>
                      <TableBody>
                        {articles?.map((article) => (
                          <TRow>
                            <TData>{article.code}</TData>
                            <TData>{article.designation}</TData>
                            <TData>{article.Category.name}</TData>
                            <TData>{article.Warehouse.name}</TData>
                            <TData>{article.Supplier.name}</TData>
                            <TData>
                              {article.hasLength
                                ? `${article.quantity} mètre(s)`
                                : article.quantity}
                            </TData>
                            <TData>{article.unitPrice} FCFA</TData>
                          </TRow>
                        ))}
                      </TableBody>
                    </table>
                  </TableContainer>
                </Table>
                {count > 9 && (
                  <Pagination>
                    <PaginationButton
                      disabled={isLastPrev}
                      onClick={() => handlePrev()}
                    >
                      <BiSolidChevronLeft size={20} />
                    </PaginationButton>
                    <PaginationButton
                      disabled={isLastNext}
                      onClick={() => handleNext()}
                    >
                      <BiSolidChevronRight size={20} />
                    </PaginationButton>
                  </Pagination>
                )}
              </>
            )}
          </>
        )}
        <ModalGroupButton>
          <ModalCancelButton onClick={() => setAction(false)}>
            Quitter
          </ModalCancelButton>
        </ModalGroupButton>
      </Modal>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
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

const Modal = styled.div`
  border: 1px solid ${color.darkBlue};
  border-radius: 5px;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
  height: 100%;
`;

const Table = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${color.border};
    border-radius: 5px;
  }
`;

const TableHead = styled(TableHeader)`
  top: 0;
  z-index: 2;
`;

const Pagination = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PaginationButton = styled.div<{ disabled: boolean }>`
  width: 70px;
  height: 30px;
  border-radius: 5px;
  box-shadow: ${({ disabled }) =>
    disabled
      ? "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
      : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ disabled }) => (disabled ? "#e0e0e0" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: ease 0.4s;

  &:hover {
    background: ${({ disabled }) => (disabled ? "" : color.lightSkyBlue)};
  }
`;

export default ArticlesModal;
