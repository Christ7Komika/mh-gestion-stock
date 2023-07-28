import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { host } from "../host";

// Define a type for the slice state

export interface Configuration {
  id: string;
  password: string;
}

interface configurationState {
  data: null | Configuration;
  isLoad: boolean;
  isError: boolean;
  isSuccess: boolean;
}

// Define the initial state using that type
const initialState: configurationState = {
  data: null,
  isLoad: false,
  isError: false,
  isSuccess: false,
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    password: (state, action: PayloadAction<Configuration>) => {
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
  },
});

export const { password, isLoad, isSuccess, isError } =
  configurationSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getPass = () => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/configuration",
  };

  axios<Configuration>(config)
    .then(({ data }) => {
      dispatch(password(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const initPass = (exit: Function) => (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  const config = {
    method: "get",
    url: host + "/configuration/init",
  };

  axios<Configuration>(config)
    .then(({ data }) => {
      dispatch(password(data));
      dispatch(isSuccess(true));
      dispatch(isLoad(false));
      exit(true);
    })
    .catch(() => {
      dispatch(isError(true));
      dispatch(isLoad(false));
    });
};

export const changePass =
  (pwd: string, exit: Function) => (dispatch: AppDispatch) => {
    dispatch(isLoad(true));
    const config = {
      method: "post",
      url: host + "/configuration/change",
      data: {
        password: pwd,
      },
    };

    axios<Configuration>(config)
      .then(({ data }) => {
        dispatch(password(data));
        dispatch(isSuccess(true));
        dispatch(isLoad(false));
        exit(true);
      })
      .catch(() => {
        dispatch(isError(true));
        dispatch(isLoad(false));
      });
  };

export default configurationSlice.reducer;
