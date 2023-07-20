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

interface Props {
  articleData: StoreType;
  setArticleNumberError: Function;
  searchData: StoreType[] | null;
  setRest: Function;
}

const ModalDataContentSection = ({
  articleData,
  setArticleNumberError,
  searchData,
  setRest,
}: Props) => {
  const [articleNumber, setArticleNumber] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [addArticle, setAddArticle] = useState<StoreType | null>(null);
  const [article, setArticle] = useState<StoreType | null>(null);

  useEffect(() => {
    if (!articleNumber) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [articleNumber]);

  useEffect(() => {
    if (searchData && articleNumber) {
      if (
        article &&
        parseFloat(articleNumber) > parseFloat(article?.quantity as string)
      ) {
        setArticleNumberError("La valeur superieur a la quantité en stock");
      } else {
        setArticleNumberError("");
      }
    }
  }, [articleNumber, article]);

  const add = (store: StoreType) => {
    setAddArticle(store);
    if (addArticle) {
      const stockNumber = parseFloat(addArticle.quantity);
      const rest = stockNumber - parseFloat(articleNumber);
      if (rest < 0) {
        return setArticleNumberError(
          "Valeur entré est superieur à la quantité en stock"
        );
      }
      setRest(rest);
    }
  };

  return (
    <ModalDataContent key={`search--${articleData.id}`}>
      <ModalDataInfos>
        <p>{articleData.designation}</p>
        <p>
          {articleData.quantity} {articleData.hasLength ? "mètre(s)" : ""}{" "}
        </p>
      </ModalDataInfos>
      <ModalDataForm>
        <ModalDataInput
          type="number"
          min={0}
          max={articleData.quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setArticleNumber(e.target.value)
          }
        />
        {isDisabled ? (
          <ModalDataInputAdd disabled>
            <IoAdd size={20} />
          </ModalDataInputAdd>
        ) : (
          <ModalDataInputAdd
            onMouseEnter={() => {
              setAddArticle(articleData);
            }}
            onMouseLeave={() => {
              setAddArticle(null);
            }}
            onClick={() => {
              add(articleData);
            }}
          >
            <IoAdd size={20} />
          </ModalDataInputAdd>
        )}

        <ModalDataInputReset onClick={() => setArticle(articleData)}>
          <IoEye size={20} />
        </ModalDataInputReset>
        <ModalDataInputReset onClick={() => setArticle(null)}>
          <IoRefresh size={20} />
        </ModalDataInputReset>
      </ModalDataForm>
    </ModalDataContent>
  );
};

export default ModalDataContentSection;
