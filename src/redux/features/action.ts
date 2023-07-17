import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

interface ActionState {
  cardModeView: boolean;
}

// Define the initial state using that type
const initialState: ActionState = {
  cardModeView: false,
};

export const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    cardModeView: (state, action: PayloadAction<boolean>) => {
      state.cardModeView = action.payload;
    },
  },
});

export const { cardModeView } = actionSlice.actions;

export const setCardViewMode =
  (isCarrdViewMode: boolean) => (dispatch: AppDispatch) => {
    dispatch(cardModeView(isCarrdViewMode));
  };

export default actionSlice.reducer;
