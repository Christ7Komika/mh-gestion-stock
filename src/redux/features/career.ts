import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import axios from "axios";
import { host } from "../host";

// Define a type for the slice state
export interface CareerType {
  id: string;
  photo: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  new: boolean;
  view: Boolean;
  civility: string;
  country: string;
  cvPath: string;
  motivationLetterPath: string;
  targetPosition: string;
  contractType: string;
  jobSearch: string;
  createdAt: Date;
}

interface careerState {
  datas: null | CareerType[];
  data: null | CareerType;
  isLoad: boolean;
  isError: Boolean;
  isSuccess: Boolean;
  news: number;
  views: number;
}

// Define the initial state using that type
const initialState: careerState = {
  datas: null,
  data: null,
  isLoad: false,
  isError: false,
  isSuccess: false,
  news: 0,
  views: 0,
};

export const careerSlice = createSlice({
  name: "career",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    careers: (state, action: PayloadAction<CareerType[]>) => {
      state.datas = [...action.payload];
    },
    career: (state, action: PayloadAction<CareerType>) => {
      state.data = action.payload;
    },
    news: (state, action: PayloadAction<number>) => {
      state.news = action.payload;
    },
    views: (state, action: PayloadAction<number>) => {
      state.views = action.payload;
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
  },
});

export const { career, careers, news, views, isLoad, isSuccess, isError } =
  careerSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getCareers = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/career",
  };

  axios<CareerType[]>(config)
    .then(({ data }) => {
      dispatch(careers(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const getCareer = (id: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/career/" + id,
  };

  axios<CareerType>(config)
    .then(({ data }) => {
      dispatch(career(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const newsNumber = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/career/new/number",
  };

  axios<number>(config)
    .then(({ data }) => {
      dispatch(news(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};
export const viewsNumber = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/career/view/number",
  };

  axios<number>(config)
    .then(({ data }) => {
      dispatch(views(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const deleteCareer = (id: string) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "delete",
    url: host + "/career/delete/" + id,
  };
  axios<CareerType[]>(config)
    .then(({ data }) => {
      dispatch(careers(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export default careerSlice.reducer;
