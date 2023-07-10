import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { host } from "../host";

// Define a type for the slice state
export interface WarehouseType {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface Warehouse {
  name?: string;
  description?: string;
}

interface WarehouseState {
  datas: null | WarehouseType[];
  data: null | WarehouseType;
  isLoad: boolean;
  currentId: string | null;
  isError: boolean;
  isSuccess: boolean;
}

// Define the initial state using that type
const initialState: WarehouseState = {
  datas: null,
  data: null,
  currentId: null,
  isLoad: false,
  isError: false,
  isSuccess: false,
};

export const warehouseSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    warehouses: (state, action: PayloadAction<WarehouseType[]>) => {
      state.datas = [...action.payload];
    },
    warehouse: (state, action: PayloadAction<WarehouseType>) => {
      state.data = action.payload;
    },
    isLoad: (state, action: PayloadAction<boolean>) => {
      state.isLoad = action.payload;
    },
    isSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    isError: (state, action: PayloadAction<boolean>) => {
      state.isLoad = action.payload;
    },
    warehouseId: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload;
    },
  },
});

export const {
  warehouses,
  warehouse,
  isLoad,
  isSuccess,
  isError,
  warehouseId,
} = warehouseSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getWarehouses = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/warehouse",
  };

  axios<WarehouseType[]>(config)
    .then(({ data }) => {
      dispatch(warehouses(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const getWarehouse = (id: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/warehouse/" + id,
  };

  axios<WarehouseType>(config)
    .then(({ data }) => {
      dispatch(warehouse(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const createWarehouse =
  (data: Warehouse, exit?: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "post",
      url: host + "/warehouse/",
      data: {
        ...data,
      },
    };

    axios<WarehouseType[]>(config)
      .then(({ data }) => {
        dispatch(warehouses(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        if (exit) exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
        if (exit) exit(true);
      });
  };

export const updateWarehouse =
  (id: string, data: Warehouse, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "put",
      url: host + "/warehouse/" + id,
      data: { ...data },
    };

    axios<WarehouseType[]>(config)
      .then(({ data }) => {
        dispatch(warehouses(data));
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

export const deleteWarehouse =
  (id: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "delete",
      url: host + "/warehouse/" + id,
    };
    axios<WarehouseType[]>(config)
      .then(({ data }) => {
        dispatch(warehouses(data));
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

export const getWarehouseId = (id: string) => (dispatch: AppDispatch) => {
  dispatch(warehouseId(id));
};

export default warehouseSlice.reducer;
