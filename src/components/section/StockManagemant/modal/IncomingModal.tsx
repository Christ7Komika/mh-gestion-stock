import {
    ModalCancelButton, ModalContainer,Modal,
    ModalGroupButton,
    ModalHeader,
    ModalHeaderExit,
    ModalHeaderTitle,
    ModalValidButton
} from "../../../layout/Layout.ts";
import {IoExit} from "react-icons/io5";
import {Dispatch, SetStateAction} from "react";
import {styled} from "styled-components";

interface Props {
    setAction: Dispatch<SetStateAction<boolean>>
    currentId: string
}
const IncomingModal = ({setAction, currentId }:Props) => {


    return (
        <ModalContainer>
            <Modal>
                <ModalHeader>
                    <ModalHeaderTitle>Ajouter une catégorie</ModalHeaderTitle>
                    <ModalHeaderExit onClick={() => setAction(false)}>
                        <IoExit />
                    </ModalHeaderExit>
                </ModalHeader>
                <h1>Content</h1>
                <ModalGroupButton>
                    <ModalCancelButton onClick={() => setAction(false)}>
                        Quitter
                    </ModalCancelButton>
                </ModalGroupButton>
            </Modal>
        </ModalContainer>
    );
};





 export default IncomingModal