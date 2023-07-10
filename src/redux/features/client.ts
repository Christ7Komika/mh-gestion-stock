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

export interface History {
  id: string;
  state: string;
  type: string;
  message: string;
  updatedAt: Date;
  createdAt: Date;
  comment: string | null;
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
  history: History[] | null;
  isLoad: boolean;
  isError: boolean;
  isSuccess: boolean;
}

// Define the initial state using that type
const initialState: clientState = {
  datas: null,
  data: null,
  isLoad: false,
  isError: false,
  history: null,
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
    history: (state, action: PayloadAction<History[]>) => {
      state.history = action.payload;
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

export const {
  client,
  clients,
  isLoad,
  isSuccess,
  isError,
  clientId,
  history,
} = clientSlice.actions;

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
export const searchClients = (data: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "post",
    url: host + "/client/find",
    data: { search: data },
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
export const getHistory = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/client/history/add",
  };

  axios<History[]>(config)
    .then(({ data }) => {
      dispatch(history(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};
export const filterHistory =
  (data: { startDate: Date; endDate: Date | null }) =>
  (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "post",
      url: host + "/client/history/filter",
      data: data,
    };

    axios<History[]>(config)
      .then(({ data }) => {
        dispatch(history(data));
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
