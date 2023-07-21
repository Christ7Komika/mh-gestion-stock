import React, { useEffect, useState } from "react";
import { StoreType } from "../../redux/features/stores";
import {
  ModalDataInputReset,
  ModalDataInfos,
  ModalDataContent,
  ModalDataForm,
  ModalDataInputAdd,
  ModalDataInput,
} from "../layout/Layout";
import { IoEye, IoAdd, IoRefresh } from "react-icons/io5";
import { UpdateStoreType } from "../section/tickets/modal/TicketModal";

interface Props {
  articleData: StoreType;
  setArticleNumberError: Function;
  searchData: StoreType[] | null;
  setArticle: Function;
  setSelectedArticle: React.Dispatch<
    React.SetStateAction<UpdateStoreType[] | []>
  >;
  selectedArticle: UpdateStoreType[];
  sumArticle: UpdateStoreType[];
  setSumArticle: React.Dispatch<React.SetStateAction<[] | UpdateStoreType[]>>;
  setRemoved: React.Dispatch<React.SetStateAction<boolean>>;
  setRemovedId: React.Dispatch<React.SetStateAction<string>>;
  removed: boolean;
  removedId: string;
}

const ModalDataContentSection = ({
  articleData,
  setArticleNumberError,
  searchData,
  setArticle,
  setSelectedArticle,
  selectedArticle,
  sumArticle,
  setSumArticle,
  removed,
  setRemoved,
  removedId,
  setRemovedId,
}: Props) => {
  const [currentData, setCurrentData] = useState<StoreType>(articleData);
  const [articleNumber, setArticleNumber] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [addArticle, setAddArticle] = useState<StoreType | null>(null);

  useEffect(() => {
    setCurrentData(articleData);
  }, []);

  useEffect(() => {
    if (!articleNumber) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [articleNumber]);

  useEffect(() => {
    if (removed && removedId) {
      setArticle(null);
      setCurrentData(articleData);
      setArticleNumber("");
      setArticleNumberError("");
      setSumArticle([
        ...sumArticle.filter((article) => article.id !== removedId),
      ]);
      setRemoved(false);
      setRemovedId("");
    }
  }, [removed, removedId]);

  useEffect(() => {
    if (searchData && articleNumber) {
      if (
        !(
          currentData &&
          parseFloat(articleNumber) >
            parseFloat(currentData?.quantity as string)
        )
      ) {
        setArticleNumberError("");
      }
    }
  }, [articleNumber, currentData]);

  const add = (store: StoreType) => {
    setAddArticle(store);
    if (addArticle) {
      const stockNumber = parseFloat(store.quantity);
      const rest = stockNumber - parseFloat(articleNumber);
      if (rest < 0) {
        return setArticleNumberError(
          "Valeur entré est superieur à la quantité en stock"
        );
      }

      if (sumArticle && sumArticle.length > 0) {
        const isValid = sumArticle
          .map((article) => {
            if (article.id === store.id) {
              const value =
                parseFloat(article.quantity) -
                (article.withdraw + parseFloat(articleNumber));
              if (value < 0) {
                setArticleNumberError(
                  "Valeur entré est superieur à la quantité en stock"
                );
                return "quit";
              }
            }
          })
          .filter((value) => value !== undefined);
        if (isValid[0] === "quit") {
          return;
        }
      }

      setCurrentData({
        ...currentData,
        quantity: rest === 0 ? "0" : rest.toString(),
      });
      setSelectedArticle([
        ...selectedArticle,
        { ...currentData, withdraw: parseFloat(articleNumber) },
      ]);

      setArticleNumber("");
    }
  };
  function formatNumberWithFixedDecimal(number: number) {
    if (number === 0) {
      return number;
    }
    const roundedNumber = parseFloat(number.toFixed(1));
    return roundedNumber % 1 === 0
      ? roundedNumber.toFixed(0)
      : roundedNumber.toString();
  }

  const getQuantity = (id: string, withdraw: number) => {
    if (id && withdraw) {
      if (sumArticle && sumArticle.length > 0) {
        const v = sumArticle
          .map((article) => {
            if (article.id === id) {
              const v = parseFloat(article.quantity) - article.withdraw;
              return formatNumberWithFixedDecimal(v);
            }
          })
          .filter((value) => value !== undefined);
        if (v[0] !== undefined) {
          return v[0];
        }
        return withdraw;
      } else {
        return formatNumberWithFixedDecimal(withdraw);
      }
    }
    return 0;
  };

  const reset = (id: string) => {
    setArticle(null);
    setCurrentData(articleData);
    setArticleNumber("");
    setArticleNumberError("");
    if (id) {
      setSumArticle([...sumArticle.filter((article) => article.id !== id)]);
    }
  };

  return (
    <ModalDataContent key={`search--${currentData?.id}`}>
      <ModalDataInfos>
        <p>{currentData?.designation}</p>
        <p>
          {getQuantity(currentData?.id, parseFloat(currentData?.quantity))}
          {currentData?.hasLength ? " mètre(s)" : ""}{" "}
        </p>
      </ModalDataInfos>
      <ModalDataForm>
        <ModalDataInput
          type="number"
          min={0}
          max={currentData?.quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setArticleNumber(e.target.value)
          }
          value={articleNumber}
        />
        {isDisabled ? (
          <ModalDataInputAdd disabled>
            <IoAdd size={20} />
          </ModalDataInputAdd>
        ) : (
          <ModalDataInputAdd
            onMouseEnter={() => {
              setAddArticle(currentData);
            }}
            onMouseLeave={() => {
              setAddArticle(null);
            }}
            onClick={() => {
              add(currentData);
            }}
          >
            <IoAdd size={20} />
          </ModalDataInputAdd>
        )}

        <ModalDataInputReset onClick={() => setArticle(currentData)}>
          <IoEye size={20} />
        </ModalDataInputReset>
        <ModalDataInputReset onClick={() => reset(currentData.id)}>
          <IoRefresh size={20} />
        </ModalDataInputReset>
      </ModalDataForm>
    </ModalDataContent>
  );
};

export default ModalDataContentSection;
