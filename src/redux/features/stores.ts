import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios, { AxiosRequestConfig } from "axios";
import { host } from "../host";

export interface SimpleGroup {
  name?: string;
  code?: string;
  designation?: string;
  type?: string;
  reference?: string;
  _count: number;
}

interface Data {
  id: string;
  logo: string | null;
  name: string;
  phone: string | null;
  email: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface SupplierGroup {
  supplier: Data;
  count: number;
}

export interface WarehouseGroup {
  warehouse: Data;
  count: number;
}

export interface CategoryGroup {
  article: Data;
  count: number;
}

export interface CommentType {
  id: string;
  message: string;
}

export interface MoveToAnotherStoreDataType {
  warehouse: string;
  quantity: string;
  currentQuantity: string;
  hasLength: string;
  comment: string;
}

export interface SupplierType {
  id: string;
  name: string;
}

export interface WarehouseType {
  id: string;
  name: string;
}

export interface CategoryType {
  id: string;
  name: string;
}

export interface FilterType {
  warehouse: string;
  supplier: string;
  category: string;
  search: string;
}

export interface GroupArticleType {}

export interface TicketType {}

export interface StoreType {
  id: string;
  image: string;
  name: string;
  code: string;
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
  Comment: {
    message: string;
  };
}

export interface Store {
  logo?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
}

export type Group =
  | SimpleGroup
  | CategoryGroup
  | WarehouseGroup
  | SupplierGroup;

export type GroupBy =
  | SimpleGroup[]
  | CategoryGroup[]
  | WarehouseGroup[]
  | SupplierGroup[];

interface storeState {
  datas: null | StoreType[];
  dataSearch: null | StoreType[];
  data: null | StoreType;
  currentId: string | null;
  group: null | GroupBy;
  history: History[] | null;
  isLoad: boolean;
  isLoadChange: boolean;
  isLoadGroup: boolean;
  isError: Boolean;
  isSuccess: Boolean;
}

// Define the initial state using that type
const initialState: storeState = {
  datas: null,
  dataSearch: null,
  data: null,
  group: null,
  isLoad: false,
  isLoadChange: false,
  isError: false,
  history: null,
  isSuccess: false,
  currentId: null,
  isLoadGroup: false,
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    stores: (state, action: PayloadAction<StoreType[]>) => {
      state.datas = [...action.payload];
    },
    search: (state, action: PayloadAction<StoreType[] | null>) => {
      state.dataSearch = action.payload;
    },
    store: (state, action: PayloadAction<StoreType>) => {
      state.data = action.payload;
    },

    emptyStore: (state, action: PayloadAction<null>) => {
      state.data = action.payload;
    },

    history: (state, action: PayloadAction<History[]>) => {
      state.history = action.payload;
    },
    groupBy: (state, action: PayloadAction<GroupBy>) => {
      state.group = action.payload;
    },

    isLoad: (state, action: PayloadAction<boolean>) => {
      state.isLoad = action.payload;
    },
    isLoadGroup: (state, action: PayloadAction<boolean>) => {
      state.isLoadGroup = action.payload;
    },
    isSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    isError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },

    isLoadChange: (state, action: PayloadAction<boolean>) => {
      state.isLoadChange = action.payload;
    },
    storeId: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload;
    },
  },
});

export const {
  store,
  stores,
  isLoad,
  isLoadChange,
  isSuccess,
  isError,
  storeId,
  history,
  emptyStore,
  groupBy,
  isLoadGroup,
  search,
} = storeSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getStores = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/articles",
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

export const setStores = (data: StoreType[]) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  dispatch(stores(data));
  dispatch(isLoad(false));
};

export const searchStores = (data: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "post",
    url: host + "/articles/find",
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
export const searchDatasStores = (data: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "post",
    url: host + "/articles/search",
    data: { search: data },
  };

  axios<StoreType[]>(config)
    .then(({ data }) => {
      dispatch(search(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};
export const emptyDatasStores = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  dispatch(search(null));
};

export const getStore = (id: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const abortController = new AbortController();
  let cancelSignal: AbortSignal;
  const config: AxiosRequestConfig = {
    method: "get",
    url: host + "/articles/" + id,
    onUploadProgress: () => {
      if (cancelSignal.aborted) {
        cancelTokenSource.cancel("Annulation de la requête");
      }
    },
  };
  cancelSignal = abortController.signal;
  const cancelTokenSource = axios.CancelToken.source();
  config.cancelToken = cancelTokenSource.token;

  axios<StoreType>(config)
    .then(({ data }) => {
      dispatch(store(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
      abortController.abort();
    });
};

export const getHistory = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/articles/history/add",
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
      url: host + "/articles/history/filter",
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

export const filter =
  (data: FilterType, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));

    const abortController = new AbortController();
    let cancelSignal: AbortSignal;
    const config: AxiosRequestConfig = {
      method: "post",
      url: host + "/articles/filter/data",
      data: data,
      onUploadProgress: () => {
        if (cancelSignal.aborted) {
          cancelTokenSource.cancel("Annulation de la requête");
        }
      },
    };
    cancelSignal = abortController.signal;
    const cancelTokenSource = axios.CancelToken.source();
    config.cancelToken = cancelTokenSource.token;

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

export const getStoreId = (id: string) => (dispatch: AppDispatch) => {
  dispatch(storeId(id));
};

export const createStore =
  (data: FormData, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const abortController = new AbortController();
    let cancelSignal: AbortSignal;
    const config: AxiosRequestConfig = {
      method: "post",
      url: host + "/articles/",
      maxBodyLength: Infinity,
      data: data,
      onUploadProgress: () => {
        if (cancelSignal.aborted) {
          cancelTokenSource.cancel("Annulation de la requête");
        }
      },
    };

    cancelSignal = abortController.signal;
    const cancelTokenSource = axios.CancelToken.source();
    config.cancelToken = cancelTokenSource.token;

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
    dispatch(isLoadChange(true));
    const abortController = new AbortController();
    let cancelSignal: AbortSignal;
    const config: AxiosRequestConfig = {
      method: "put",
      url: host + "/articles/" + id,
      data: data,
      onUploadProgress: () => {
        if (cancelSignal.aborted) {
          cancelTokenSource.cancel("Annulation de la requête");
        }
      },
    };
    cancelSignal = abortController.signal;
    const cancelTokenSource = axios.CancelToken.source();
    config.cancelToken = cancelTokenSource.token;
    axios<StoreType[]>(config)
      .then(({ data }) => {
        dispatch(stores(data));
        dispatch(isSuccess(true));
        dispatch(isLoadChange(false));
        dispatch(emptyStore(null));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoadChange(false));
        abortController.abort();
      });
  };

export const addQuantityToStore =
  (id: string, data: { quantity: string; comment: string }, exit: Function) =>
  (dispatch: AppDispatch) => {
    dispatch(isLoadChange(true));

    const config = {
      method: "put",
      url: host + "/articles/add/" + id,
      data: data,
    };

    axios<StoreType[]>(config)
      .then(({ data }) => {
        dispatch(stores(data));
        dispatch(isSuccess(true));
        dispatch(isLoadChange(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoadChange(false));
      });
  };

export const removeQuantityToStore =
  (
    id: string,
    data: { currentQuantity: string; quantity: string; comment: string },
    exit: Function
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(isLoadChange(true));

    const config = {
      method: "put",
      url: host + "/articles/remove/" + id,
      data: data,
    };

    axios<StoreType[]>(config)
      .then(({ data }) => {
        dispatch(stores(data));
        dispatch(isSuccess(true));
        dispatch(isLoadChange(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoadChange(false));
      });
  };

export const changeStorage =
  (id: string, data: { warehouse: string; comment: string }, exit: Function) =>
  (dispatch: AppDispatch) => {
    dispatch(isLoadChange(true));

    const config = {
      method: "put",
      url: host + "/articles/change/storage/" + id,
      data: data,
    };

    axios<StoreType[]>(config)
      .then(({ data }) => {
        dispatch(stores(data));
        dispatch(isSuccess(true));
        dispatch(isLoadChange(false));
        dispatch(emptyStore(null));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoadChange(false));
      });
  };

export const changeSupplier =
  (id: string, data: { supplier: string; comment: string }, exit: Function) =>
  (dispatch: AppDispatch) => {
    dispatch(isLoadChange(true));

    const config = {
      method: "put",
      url: host + "/articles/change/supplier/" + id,
      data: data,
    };

    axios<StoreType[]>(config)
      .then(({ data }) => {
        dispatch(stores(data));
        dispatch(isSuccess(true));
        dispatch(isLoadChange(false));
        dispatch(emptyStore(null));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoadChange(false));
      });
  };

export const changeCategory =
  (id: string, data: { category: string; comment: string }, exit: Function) =>
  (dispatch: AppDispatch) => {
    dispatch(isLoadChange(true));

    const config = {
      method: "put",
      url: host + "/articles/change/category/" + id,
      data: data,
    };

    axios<StoreType[]>(config)
      .then(({ data }) => {
        dispatch(stores(data));
        dispatch(isSuccess(true));
        dispatch(isLoadChange(false));
        dispatch(emptyStore(null));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoadChange(false));
      });
  };

export const moveToStore =
  (id: string, data: MoveToAnotherStoreDataType, exit: Function) =>
  (dispatch: AppDispatch) => {
    dispatch(isLoadChange(true));

    const config = {
      method: "put",
      url: host + "/articles/move/store/" + id,
      data: data,
    };

    axios<StoreType[]>(config)
      .then(({ data }) => {
        dispatch(stores(data));
        dispatch(isSuccess(true));
        dispatch(isLoadChange(false));
        dispatch(emptyStore(null));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoadChange(false));
      });
  };

export const deleteStore =
  (id: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "delete",
      url: host + "/articles/" + id,
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

export const filtersByGroup =
  (search: string, group: string) => (dispatch: AppDispatch) => {
    dispatch(isLoadGroup(true));
    const config = {
      method: "post",
      url: host + "/articles/group",
      data: {
        group: group,
        search: search,
      },
    };
    axios<GroupBy>(config)
      .then(({ data }) => {
        dispatch(groupBy(data));
        dispatch(isSuccess(true));
        dispatch(isLoadGroup(false));
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoadGroup(false));
      });
  };

export default storeSlice.reducer;
