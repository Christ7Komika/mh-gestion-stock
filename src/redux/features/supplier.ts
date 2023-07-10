import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { host } from "../host";

// Define a type for the slice state

export type Reference = {
  name: string;
};

export interface SupplierType {
  id: string;
  logo: string;
  name: string;
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

export interface Supplier {
  logo?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
}

interface supplierState {
  datas: null | SupplierType[];
  data: null | SupplierType;
  currentId: string | null;
  history: History[] | null;
  isLoad: boolean;
  isError: boolean;
  isSuccess: boolean;
}

// Define the initial state using that type
const initialState: supplierState = {
  datas: null,
  data: null,
  isLoad: false,
  isError: false,
  history: null,
  isSuccess: false,
  currentId: null,
};

export const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    suppliers: (state, action: PayloadAction<SupplierType[]>) => {
      state.datas = [...action.payload];
    },
    supplier: (state, action: PayloadAction<SupplierType>) => {
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
    supplierId: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload;
    },
  },
});

export const {
  supplier,
  suppliers,
  isLoad,
  isSuccess,
  isError,
  supplierId,
  history,
} = supplierSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getSuppliers = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/supplier",
  };

  axios<SupplierType[]>(config)
    .then(({ data }) => {
      dispatch(suppliers(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};
export const searchSupplier = (data: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "post",
    url: host + "/supplier/find",
    data: { search: data },
  };

  axios<SupplierType[]>(config)
    .then(({ data }) => {
      dispatch(suppliers(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const getSupplier = (id: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/supplier/" + id,
  };

  axios<SupplierType>(config)
    .then(({ data }) => {
      dispatch(supplier(data));
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
    url: host + "/supplier/history/add",
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
      url: host + "/supplier/history/filter",
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

export const getSupplierId = (id: string) => (dispatch: AppDispatch) => {
  dispatch(supplierId(id));
};

export const createSupplier =
  (data: FormData, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "post",
      url: host + "/supplier/",
      data: data,
    };

    axios<SupplierType[]>(config)
      .then(({ data }) => {
        dispatch(suppliers(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export const updateSupplier =
  (id: string, data: FormData, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "put",
      url: host + "/supplier/" + id,
      data: data,
    };

    axios<SupplierType[]>(config)
      .then(({ data }) => {
        dispatch(suppliers(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export const deleteSupplier =
  (id: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "delete",
      url: host + "/supplier/" + id,
    };
    axios<SupplierType[]>(config)
      .then(({ data }) => {
        dispatch(suppliers(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export default supplierSlice.reducer;
