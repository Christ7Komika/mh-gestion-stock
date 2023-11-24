import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { filtersByGroup } from "../../../../redux/features/stores";
import CardGroup from "./CardGoup";
import GroupModal from "../../stores/modal/GroupModal";

const CardView = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.store.group);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    filtersByGroup("", "name")(dispatch);
  }, []);

  const handleOpen = (name: string, value: string) => {
    setName(name);
    setValue(value);
    setOpen(true);
  };
  return (
    <>
      <Container>
        {articles?.map((article: any) => {
          if (article.name) {
            return (
              <CardGroup
                type="name"
                handleOpen={handleOpen}
                name={article.name}
                count={article._count}
              />
            );
          } else if (article.code) {
            return (
              <CardGroup
                type="code"
                handleOpen={handleOpen}
                name={article.code}
                count={article._count}
              />
            );
          } else if (article.designation) {
            return (
              <CardGroup
                type="designation"
                handleOpen={handleOpen}
                name={article.designation}
                count={article._count}
              />
            );
          } else if (article.type) {
            return (
              <CardGroup
                type="type"
                handleOpen={handleOpen}
                name={article.type}
                count={article._count}
              />
            );
          } else if (article.lotNumber) {
            return (
              <CardGroup
                type="lotNumber"
                handleOpen={handleOpen}
                name={article.lotNumber}
                count={article._count}
              />
            );
          } else if (article.reference) {
            return (
              <CardGroup
                type="reference"
                handleOpen={handleOpen}
                name={article.reference}
                count={article._count}
              />
            );
          } else if (article.supplier) {
            return (
              <CardGroup
                type="supplier"
                handleOpen={handleOpen}
                name={article.supplier.name}
                count={article.count}
              />
            );
          } else if (article.category) {
            return (
              <CardGroup
                type="category"
                handleOpen={handleOpen}
                name={article.category.name}
                count={article.count}
              />
            );
          } else if (article.warehouse) {
            return (
              <CardGroup
                type="warehouse"
                handleOpen={handleOpen}
                name={article.warehouse.name}
                count={article.count}
              />
            );
          } else {
            return <></>;
          }
        })}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

export default CardView;
