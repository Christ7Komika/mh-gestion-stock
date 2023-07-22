import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { host } from "../host";
import { UpdateStoreType } from "../../components/section/tickets/modal/TicketModal";
import { StoreType } from "./stores";
import { ClientType } from "./client";

export interface ItemType {
  id: string;
  quantity: string;
  article: StoreType[];
}

export interface TicketType {
  id: string;
  name: string;
  purchaseOrder: string;
  status: string;
  sum: string;
  articles: StoreType[];
  item: ItemType;
  updatedAt: Date;
  createdAt: Date;
  Client: ClientType;
}

export interface TicketTypeData {
  name: string;
  orderNumber: string;
  client: string;
  articles: UpdateStoreType[];
  sum: string;
}

export interface Ticket {
  name?: string;
  reference?: string;
  description?: string;
}

interface TicketState {
  datas: null | TicketType[];
  data: null | TicketType;
  isLoad: boolean;
  isLoadCreate: boolean;
  currentId: string | null;
  isError: boolean;
  isSuccess: boolean;
}

const initialState: TicketState = {
  datas: null,
  data: null,
  currentId: null,
  isLoad: false,
  isLoadCreate: false,
  isError: false,
  isSuccess: false,
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    tickets: (state, action: PayloadAction<TicketType[]>) => {
      state.datas = [...action.payload];
    },
    ticket: (state, action: PayloadAction<TicketType>) => {
      state.data = action.payload;
    },
    isLoad: (state, action: PayloadAction<boolean>) => {
      state.isLoad = action.payload;
    },
    isLoadCreate: (state, action: PayloadAction<boolean>) => {
      state.isLoadCreate = action.payload;
    },
    isSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    isError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    categoryId: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload;
    },
  },
});

export const {
  tickets,
  ticket,
  isLoad,
  isSuccess,
  isError,
  categoryId,
  isLoadCreate,
} = ticketSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getTickets = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/ticket",
  };

  axios<TicketType[]>(config)
    .then(({ data }) => {
      dispatch(tickets(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const getTicket = (id: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/ticket/" + id,
  };

  axios<TicketType>(config)
    .then(({ data }) => {
      dispatch(ticket(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const createTicket =
  (data: TicketTypeData, exit?: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoadCreate(true));
    const config = {
      method: "post",
      url: host + "/ticket",
      data: {
        ...data,
      },
    };

    axios<TicketType[]>(config)
      .then(({ data }) => {
        dispatch(tickets(data));
        dispatch(isSuccess(true));
        dispatch(isLoadCreate(false));
        if (exit) exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoadCreate(false));
        if (exit) exit(true);
      });
  };

export const updateTicket =
  (id: string, data: Ticket, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "put",
      url: host + "/ticket/" + id,
      data: { ...data },
    };

    axios<TicketType[]>(config)
      .then(({ data }) => {
        dispatch(tickets(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        if (exit) {
          exit(true);
        }
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export const deleteTicket =
  (id: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "delete",
      url: host + "/ticket/" + id,
    };
    axios<TicketType[]>(config)
      .then(({ data }) => {
        dispatch(tickets(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export const getTicketId = (id: string) => (dispatch: AppDispatch) => {
  dispatch(categoryId(id));
};

export default ticketSlice.reducer;
