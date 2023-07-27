import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { host } from "../host";
import { UpdateStoreType } from "../../components/section/tickets/modal/TicketModal";
import { StoreType } from "./stores";

export interface ArticleType {
  id: string;
  designation: string;
  _count: number;
}

export interface History {
  id: string;
  state: string;
  type: string;
  message: string;
  updatedAt: Date;
  createdAt: Date;
  Comment: {
    message: string;
  };
}

export interface ItemType {
  id: string;
  quantity: string;
  withdraw: string;
  sumValue: string;
  hasLength: boolean;
  article: ArticleType;
}

export interface TicketType {
  id: string;
  name: string;
  purchaseOrder: string;
  status: string;
  sum: string;
  articles: StoreType[];
  item: ItemType[];
  updatedAt: Date;
  createdAt: Date;
  Client: {
    id: string;
    name: string;
  };
}

export interface TicketTypeData {
  name: string;
  orderNumber: string;
  client: string;
  articles: UpdateStoreType[];
  sum: string;
  applicant?: string;
  discount?: string;
}

export interface Ticket {
  name?: string;
  reference?: string;
  description?: string;
}

interface TicketState {
  datas: null | TicketType[];
  data: null | TicketType;
  history: null | History[];
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
  history: null,
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
    history: (state, action: PayloadAction<History[]>) => {
      state.history = action.payload;
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
  history,
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

export const getHistory = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/ticket/history/add",
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
      url: host + "/ticket/history/filter",
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
export const validateTicket =
  (id: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "get",
      url: host + "/ticket/valid/" + id,
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
export const cancelTicket =
  (id: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "get",
      url: host + "/ticket/cancel/" + id,
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
