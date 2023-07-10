import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./features/client";
import supplierReducer from "./features/supplier";
import categoryReducer from "./features/category";
import storeReducer from "./features/stores";

export const store = configureStore({
  reducer: {
    client: clientReducer,
    supplier: supplierReducer,
    category: categoryReducer,
    store: storeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
