import styled from "styled-components";
import { color } from "../../../../utils/color";
import { useEffect, useState } from "react";
import DatePicker from "../../../input/DatePicker";
import { useDispatch } from "react-redux";
import { filterHistory, getHistory } from "../../../../redux/features/stores";

const InfosHistoricalHeader = () => {
  const [dates, setDates] = useState<Date[]>([]);
  const [format, setFormat] = useState<string[]>([]);
  const [datePlaceholder, setDatePlaceholder] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [init, setInit] = useState<boolean>(false);
  const getDateFormatTo = (d: string) => {
    const split = d.split("/");
    return `${split[2]}-${split[1]}-${split[0]}`;
  };

  useEffect(() => {
    if (init) {
      setDates([]);
      setFormat([]);
      setDatePlaceholder([]);
      getHistory()(dispatch);
      setInit(false);
    }
  }, [init]);

  useEffect(() => {
    if (format.length === 1) {
      setDatePlaceholder([getDateFormatTo(format[0])]);
    }
    if (format.length === 2) {
      setDatePlaceholder([
        getDateFormatTo(format[0]),
        getDateFormatTo(format[1]),
      ]);
    }
  }, format);

  useEffect(() => {
    if (dates) {
      if (dates.length === 1) {
        setFormat([
          dates[0].toLocaleDateString("fr-FR", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          }),
        ]);
      } else if (dates.length === 2) {
        setFormat([
          dates[0].toLocaleDateString("fr-FR", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          }),
          dates[1].toLocaleDateString("fr-FR", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          }),
        ]);
      }
    }
  }, [dates]);
  useEffect(() => {
    if (dates) {
      const startDate = dates[0];
      const endDate = dates[1] || null;
      filterHistory({ startDate: startDate, endDate: endDate })(dispatch);
    }
  }, [dates]);
  return (
    <Container>
      <ColorLine />
      <InfosHeaderColumnContent>
        <InfosHeaderTitle>Historique article</InfosHeaderTitle>
        <DatePicker
          setDates={setDates}
          dates={format}
          datePlaceholder={datePlaceholder}
          setInit={setInit}
        />
      </InfosHeaderColumnContent>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: 20px 1fr;
  column-gap: 0.5rem;
  position: sticky;
  top: 0;
  left: 0;
  background: #fff;
  box-shadow: 0.5px 1px 6px rgba(0, 0, 0, 0.2);
`;

const ColorLine = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: ${color.fadeBlue};
`;

const InfosHeaderColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0.5rem;
`;

const InfosHeaderTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${color.darkBlue};
  text-transform: uppercase;
`;

export default InfosHistoricalHeader;
