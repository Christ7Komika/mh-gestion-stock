import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { host } from "../host";

// Define a type for the slice state
export interface CategoryType {
  id: string;
  name: string;
  reference: string;
  description: string;
  createdAt: Date;
}

export interface Category {
  name?: string;
  reference?: string;
  description?: string;
}

interface CategoryState {
  datas: null | CategoryType[];
  data: null | CategoryType;
  isLoad: boolean;
  currentId: string | null;
  isError: boolean;
  isSuccess: boolean;
}

// Define the initial state using that type
const initialState: CategoryState = {
  datas: null,
  data: null,
  currentId: null,
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
      state.isError = action.payload;
    },
    categoryId: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload;
    },
  },
});

export const { categories, category, isLoad, isSuccess, isError, categoryId } =
  categorySlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getCategories = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const { signal, abort } = new AbortController();

  const config = {
    method: "get",
    url: host + "/category",
    signal,
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
    })
    .finally(() => abort());
};

export const getCategory = (id: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const { signal, abort } = new AbortController();
  const config = {
    method: "get",
    url: host + "/category/" + id,
    signal,
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
    })
    .finally(() => abort());
};

export const createCategory =
  (data: Category, exit?: Function) => (dispatch: AppDispatch) => {
    const { signal, abort } = new AbortController();
    dispatch(isLoad(true));
    const config = {
      method: "post",
      url: host + "/category/",
      signal,
      data: {
        ...data,
      },
    };

    axios<CategoryType[]>(config)
      .then(({ data }) => {
        dispatch(categories(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        if (exit) exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
        if (exit) exit(true);
      })
      .finally(() => abort());
  };

export const updateCategory =
  (id: string, data: Category, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const { signal, abort } = new AbortController();
    const config = {
      method: "put",
      url: host + "/category/" + id,
      signal,
      data: { ...data },
    };

    axios<CategoryType[]>(config)
      .then(({ data }) => {
        dispatch(categories(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        if (exit) {
          exit(true);
        }
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      })
      .finally(() => abort());
  };

export const deleteCategory =
  (id: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const { signal, abort } = new AbortController();
    const config = {
      method: "delete",
      url: host + "/category/" + id,
      signal,
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
      })
      .finally(() => abort());
  };

export const getCategoryId = (id: string) => (dispatch: AppDispatch) => {
  dispatch(categoryId(id));
};

export default categorySlice.reducer;
