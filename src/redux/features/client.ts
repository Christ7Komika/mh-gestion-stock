import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { host } from "../host";

// Define a type for the slice state
export interface ClientType {
  id: string;
  logo: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  ticketId: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface Client {
  logo?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
}

interface clientState {
  datas: null | ClientType[];
  data: null | ClientType;
  currentId: string | null;
  isLoad: boolean;
  isError: Boolean;
  isSuccess: Boolean;
}

// Define the initial state using that type
const initialState: clientState = {
  datas: null,
  data: null,
  isLoad: false,
  isError: false,
  isSuccess: false,
  currentId: null,
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clients: (state, action: PayloadAction<ClientType[]>) => {
      state.datas = [...action.payload];
    },
    client: (state, action: PayloadAction<ClientType>) => {
      state.data = action.payload;
    },
    isLoad: (state, action: PayloadAction<boolean>) => {
      state.isLoad = action.payload;
    },
    isSuccess: (state, action: PayloadAction<boolean>) => {
      state.isLoad = action.payload;
    },
    isError: (state, action: PayloadAction<boolean>) => {
      state.isLoad = action.payload;
    },
    clientId: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload;
    },
  },
});

export const { client, clients, isLoad, isSuccess, isError, clientId } =
  clientSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getClients = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/client",
  };

  axios<ClientType[]>(config)
    .then(({ data }) => {
      dispatch(clients(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const getClient = (id: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/client/" + id,
  };

  axios<ClientType>(config)
    .then(({ data }) => {
      dispatch(client(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const getClientId = (id: string) => (dispatch: AppDispatch) => {
  dispatch(clientId(id));
};

export const createClient =
  (data: FormData, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "post",
      url: host + "/client/",
      data: data,
    };

    axios<ClientType[]>(config)
      .then(({ data }) => {
        dispatch(clients(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export const updateClient =
  (id: string, data: FormData, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "put",
      url: host + "/client/" + id,
      data: data,
    };

    axios<ClientType[]>(config)
      .then(({ data }) => {
        dispatch(clients(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export const deleteClient =
  (id: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "delete",
      url: host + "/client/" + id,
    };
    axios<ClientType[]>(config)
      .then(({ data }) => {
        dispatch(clients(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export default clientSlice.reducer;
