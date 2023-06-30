import { IoEye, IoCreate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import {
  OptionGroup,
  TData,
  THRow,
  THead,
  TRow,
  TableBody,
  TableContainer,
  TableHeader,
  Option,
  TDImg,
} from "../../layout/table";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
  ClientType,
  getClientId,
  getClients,
} from "../../../redux/features/client";
import DeleteModal from "./modal/DeleteModal";
import UpdateClientModal from "./modal/updateClientModal";

const Table = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state: RootState) => state.client.datas);
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [clientData, setClientData] = useState<ClientType | null>(null);
  const [select, setSelect] = useState<boolean>(false);

  useEffect(() => {
    getClients()(dispatch);
  }, []);

  const handleDelete = (name: string, id: string) => {
    setName(name);
    setId(id);
    setModalDelete(true);
  };

  const handleUpdate = (client: ClientType) => {
    setClientData(client);
    setModalUpdate(true);
  };

  const handleSee = (id: string) => {
    getClientId(id)(dispatch);
  };

  return (
    <>
      {modalDelete && (
        <DeleteModal setAction={setModalDelete} trueName={name} id={id} />
      )}
      {modalUpdate && (
        <UpdateClientModal setAction={setModalUpdate} client={clientData} />
      )}
      <TableContainer>
        <table>
          <TableHeader>
            <THRow>
              <THead>ID</THead>
              <THead>Logo</THead>
              <THead>Nom</THead>
              <THead>Société</THead>
              <THead>Téléphone</THead>
              <THead>Email</THead>
              <THead>Ajouté le</THead>
              <THead>Action</THead>
            </THRow>
          </TableHeader>
          <TableBody>
            {clients?.map((client, id) => (
              <TRow key={`client-table-${id}`} selected={select}>
                <TData>{id + 1}</TData>
                <TData>
                  <TDImg />
                </TData>
                <TData>{client.name}</TData>
                <TData>{client.company}</TData>
                <TData>{client.phone}</TData>
                <TData>{client.email}</TData>
                <TData>{new Date(client.createdAt).toLocaleDateString()}</TData>
                <TData>
                  <OptionGroup>
                    <Option action="add" onClick={() => handleSee(client.id)}>
                      <IoEye size={15} />
                    </Option>
                    <Option
                      action="update"
                      onClick={() => handleUpdate(client)}
                    >
                      <IoCreate size={15} />
                    </Option>
                    <Option
                      action="delete"
                      onClick={() => handleDelete(client.name, client.id)}
                    >
                      <MdDelete size={15} />
                    </Option>
                  </OptionGroup>
                </TData>
              </TRow>
            ))}
          </TableBody>
        </table>
      </TableContainer>
    </>
  );
};

export default Table;
