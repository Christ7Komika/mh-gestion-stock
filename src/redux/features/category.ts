import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { host } from "../host";

// Define a type for the slice state
export interface CategoryType {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Category {
  name?: string;
}

interface CategoryState {
  datas: null | CategoryType[];
  data: null | CategoryType;
  isLoad: boolean;
  isError: Boolean;
  isSuccess: Boolean;
}

// Define the initial state using that type
const initialState: CategoryState = {
  datas: null,
  data: null,
  isLoad: false,
  isError: false,
  isSuccess: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categories: (state, action: PayloadAction<CategoryType[]>) => {
      state.datas = [...action.payload];
    },
    category: (state, action: PayloadAction<CategoryType>) => {
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
  },
});

export const { categories, category, isLoad, isSuccess, isError } =
  categorySlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getCategories = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/category",
  };

  axios<CategoryType[]>(config)
    .then(({ data }) => {
      dispatch(categories(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const getCategory = (id: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/category/" + id,
  };

  axios<CategoryType>(config)
    .then(({ data }) => {
      dispatch(category(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const createCategory =
  (data: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "post",
      url: host + "/category/",
      data: {
        name: data,
      },
    };

    axios<CategoryType[]>(config)
      .then(({ data }) => {
        dispatch(categories(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export const updateCategory =
  (id: string, data: object, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "put",
      url: host + "/category/" + id,
      data: data,
    };

    axios<CategoryType[]>(config)
      .then(({ data }) => {
        dispatch(categories(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export const deleteCategory =
  (id: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "delete",
      url: host + "/category/" + id,
    };
    axios<CategoryType[]>(config)
      .then(({ data }) => {
        dispatch(categories(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export default categorySlice.reducer;
