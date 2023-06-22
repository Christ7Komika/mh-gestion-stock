import { styled } from "styled-components";
import { color } from "../../utils/color";
import {
  IoCalendar,
  IoChevronDown,
  IoChevronUp,
  IoClose,
  IoReload,
} from "react-icons/io5";
import { useState } from "react";

interface Props {
  setDates: Function;
  dates: string[];
  datePlaceholder: string[];
  setInit: Function;
}

const DatePicker = ({ setDates, dates, datePlaceholder, setInit }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<null | string>(null);
  const [endDate, setEndDate] = useState<null | string>(null);
  const [isValid, setIsValid] = useState(true);
  const [isInvalidUnique, setIsInvalidUnique] = useState(false);
  const [noneSelectedDate, setNoneSelectedDate] = useState(false);
  const [outRangeDate, setOutRangeDate] = useState(false);

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!startDate && !endDate) {
      setNoneSelectedDate(true);
    } else if (startDate && !endDate) {
      const start = new Date(startDate);
      setDates([start]);
      setOpen(false);
    } else if (endDate && !startDate) {
      setIsInvalidUnique(true);
    } else if (startDate && endDate) {
      const now = new Date().getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      if (start > now || end > now) {
        setOutRangeDate(true);
      } else if (start < end) {
        setIsValid(true);
        setDates([new Date(startDate), new Date(endDate)]);
        setOpen(false);
      } else if (start === end) {
        setDates([new Date(startDate)]);
        setOpen(false);
      }
    }
  };

  const init = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setDates([]);
    setStartDate(null);
    setEndDate(null);
    setInit(true);
    setOpen(false);
  };
  return (
    <Container>
      <DateContainer onClick={() => setOpen(!open)}>
        <CalendarIcon>
          <IoCalendar size={15} />
        </CalendarIcon>
        <DateLabel>
          {dates && dates.length !== 0
            ? dates.join(" - ")
            : "Sélectionner une date"}
        </DateLabel>
        <ArrowIcon>
          {open ? <IoChevronUp size={15} /> : <IoChevronDown size={15} />}
        </ArrowIcon>
      </DateContainer>
      {open && (
        <DateModal>
          <DateGroups>
            <DateGroup>
              <DateGroupLabel>Date du debut</DateGroupLabel>

              <DateInput
                type="date"
                id="start-date"
                onChange={(e) => setStartDate(e.target.value)}
                value={
                  startDate
                    ? startDate
                    : datePlaceholder.length >= 1 && !startDate
                    ? dates[0]
                    : ""
                }
              />
            </DateGroup>
            <DateGroup>
              <DateGroupLabel>Date de fin</DateGroupLabel>

              <DateInput
                type="date"
                id="end-date"
                onChange={(e) => setEndDate(e.target.value)}
                value={
                  endDate
                    ? endDate
                    : datePlaceholder.length === 2 && !endDate
                    ? dates[1]
                    : datePlaceholder.length === 1
                    ? ""
                    : ""
                }
              />
            </DateGroup>
            <DateButtonGroup>
              <DateButton onClick={(e) => submit(e)}>Valider</DateButton>
              <DateButton onClick={(e) => init(e)}>
                <IoReload size={20} />
              </DateButton>
            </DateButtonGroup>
            {!isValid && (
              <ErrorMessage>
                <ErrorMessageExit onClick={() => setIsValid(false)}>
                  <IoClose size={15} />
                </ErrorMessageExit>
                La Date de fin doit être superieur á la date de début
              </ErrorMessage>
            )}
            {isInvalidUnique && (
              <ErrorMessage>
                <ErrorMessageExit onClick={() => setIsInvalidUnique(false)}>
                  <IoClose size={15} />
                </ErrorMessageExit>
                Veuillez selectionner la date de début
              </ErrorMessage>
            )}
            {noneSelectedDate && (
              <ErrorMessage>
                <ErrorMessageExit onClick={() => setNoneSelectedDate(false)}>
                  <IoClose size={15} />
                </ErrorMessageExit>
                Aucune date n'a été sélectionné
              </ErrorMessage>
            )}
            {outRangeDate && (
              <ErrorMessage>
                <ErrorMessageExit onClick={() => setOutRangeDate(false)}>
                  <IoClose size={15} />
                </ErrorMessageExit>
                La date sélectionner ne doit pas être superieur à la date
                d'aujourd'hui
              </ErrorMessage>
            )}
          </DateGroups>
        </DateModal>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const DateContainer = styled.div`
  width: 236.97px;
  height: 35px;
  background: #fff;
  border: 1px solid ${color.darkBlue};
  border-radius: 35px;
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  align-items: center;
  padding-inline: 5px;
  cursor: pointer;
  transition: linear 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;

const CalendarIcon = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: ${color.darkBlue};
  color: #fff;
`;
const DateLabel = styled.p`
  width: 100%;
  height: 30px;
  font-size: 0.9rem;
  color: ${color.darkBlue};
  line-height: 30px;
`;
const ArrowIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  color: ${color.darkBlue};
`;

const DateModal = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 236.97px;
  height: auto;
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0.5px 1px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const DateGroups = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`;

const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
`;

const DateInput = styled.input`
  height: 35px;
  appearance: none;
  border: 2px solid ${color.darkBlue};
  color: ${color.darkBlue};
  border-radius: 5px;
  padding-inline: 5px;
  font-weight: 600;
`;

const DateGroupLabel = styled.p`
  font-size: 0.9rem;
  color: ${color.darkBlue};
`;

const DateButtonGroup = styled.div`
  display: flex;
  column-gap: 1rem;
`;

const DateButton = styled.button`
  cursor: pointer;
  border: 2px solid ${color.darkBlue};
  background: ${color.darkBlue};
  border-radius: 5px;
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: linear 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;

const ErrorMessage = styled.small`
  position: relative;
  background-color: ${color.red};
  color: ${color.darkRed};
  padding: 0.5rem;
  border-radius: 5px;
`;

const ErrorMessageExit = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 15px;
  height: 15px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${color.darkBlue};
  transition: linear 0.2s;
  cursor: pointer;
  &:hover {
    color: ${color.darkRed};
  }
`;
export default DatePicker;
