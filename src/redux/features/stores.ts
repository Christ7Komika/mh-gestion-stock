import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { host } from "../host";

export interface CommentType {}

export interface SupplierType {}

export interface WarehouseType {}

export interface CategoryType {}

export interface GroupArticleType {}

export interface TicketType {}

export interface StoreType {
  id: string;
  image: string;
  name: string;
  type: string;
  designation: string;
  length: string;
  quantity: string;
  hasLength: string;
  purchasePrice: string;
  reference: string;
  sellingPrice: string;
  unitPrice: string;
  lotNumber: string;
  operatingPressure: string;
  diameter: string;
  fluid: string;
  Comment: CommentType;
  Supplier: SupplierType;
  Warehouse: WarehouseType;
  Category: CategoryType;
  GroupArticle: GroupArticleType;
  Ticket: TicketType;
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

export interface Store {
  logo?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
}

interface storeState {
  datas: null | StoreType[];
  data: null | StoreType;
  currentId: string | null;
  history: History[] | null;
  isLoad: boolean;
  isError: Boolean;
  isSuccess: Boolean;
}

// Define the initial state using that type
const initialState: storeState = {
  datas: null,
  data: null,
  isLoad: false,
  isError: false,
  history: null,
  isSuccess: false,
  currentId: null,
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    stores: (state, action: PayloadAction<StoreType[]>) => {
      state.datas = [...action.payload];
    },
    store: (state, action: PayloadAction<StoreType>) => {
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
    storeId: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload;
    },
  },
});

export const { store, stores, isLoad, isSuccess, isError, storeId, history } =
  storeSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getStores = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/store",
  };

  axios<StoreType[]>(config)
    .then(({ data }) => {
      dispatch(stores(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};
export const searchStores = (data: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "post",
    url: host + "/store/find",
    data: { search: data },
  };

  axios<StoreType[]>(config)
    .then(({ data }) => {
      dispatch(stores(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const getStore = (id: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/store/" + id,
  };

  axios<StoreType>(config)
    .then(({ data }) => {
      dispatch(store(data));
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
    url: host + "/store/history/add",
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
      url: host + "/store/history/filter",
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

export const getStoreId = (id: string) => (dispatch: AppDispatch) => {
  dispatch(storeId(id));
};

export const createStore =
  (data: FormData, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "post",
      url: host + "/store/",
      data: data,
    };

    axios<StoreType[]>(config)
      .then(({ data }) => {
        dispatch(stores(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export const updateStore =
  (id: string, data: FormData, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "put",
      url: host + "/store/" + id,
      data: data,
    };

    axios<StoreType[]>(config)
      .then(({ data }) => {
        dispatch(stores(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export const deleteStore =
  (id: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "delete",
      url: host + "/store/" + id,
    };
    axios<StoreType[]>(config)
      .then(({ data }) => {
        dispatch(stores(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export default storeSlice.reducer;
