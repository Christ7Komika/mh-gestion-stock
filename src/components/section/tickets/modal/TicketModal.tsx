import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import {
  ModalCancelButton,
  ModalDoubleFormGroup,
  ModalForm,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalInfosContent,
  ModalInfosTitle,
  ModalSection3,
  ModalTripleFormGroup,
  ModalValidButton,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import InputText from "../../../input/InputText";
import { useState } from "react";
import InputSelect from "../../../input/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";

interface Props {
  setAction: Function;
}

const TicketModal = ({ setAction }: Props) => {
  const [name, setName] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderNumberError, setOrderNumberError] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [selectedArticles, setSelectedArticles] = useState<number>(0);
  const [sumArticle, setSumArticle] = useState<number>(0);

  const dispatch = useDispatch();
  const clients = useSelector((state: RootState) => state.client.datas);
  const isLoad = useSelector((state: RootState) => state.client.isLoad);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Créer un ticket</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalSection3>
          <ModalForm>
            <InputText
              name="Nom *"
              id="name"
              defaultValue={name}
              setValue={setName}
              error={nameError}
              placeholder="Le nom de l'article"
            />
            <InputText
              name="Numéro de commande"
              id="orderNumber"
              defaultValue={orderNumber}
              setValue={setOrderNumber}
              error={orderNumberError}
              placeholder="Inserer le numéro de commande"
            />

            <InputSelect
              placeholder="Sélectionner le client"
              name="Client *"
              id="client"
              defaultValue={client}
              setId={setClient}
              error={""}
              data={clients}
            />
            <ModalInfosContent>
              <span>Nombre article(s)</span>
              <span>{selectedArticles}</span>
            </ModalInfosContent>
            <ModalInfosContent>
              <span>Somme</span>
              <span>{sumArticle} FCFA</span>
            </ModalInfosContent>
          </ModalForm>
          <ModalForm>
            <h1>Test</h1>
          </ModalForm>
          <ModalForm>
            <ModalInfosContent>
              <h3>ARTICLE AJOUTÉ</h3>
              <h4>{selectedArticles}</h4>
            </ModalInfosContent>
          </ModalForm>
        </ModalSection3>

        {isLoad ? (
          <ModalGroupButton>
            <ModalValidButton>
              <Loader />
            </ModalValidButton>
          </ModalGroupButton>
        ) : (
          <ModalGroupButton>
            <ModalValidButton onClick={(e: React.SyntheticEvent) => submit(e)}>
              Valider
            </ModalValidButton>
            <ModalCancelButton onClick={() => setAction(false)}>
              Annuler
            </ModalCancelButton>
          </ModalGroupButton>
        )}
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
`;

export default TicketModal;
