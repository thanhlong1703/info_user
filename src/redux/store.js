import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./UsersSlice";
const rootReducer = { listUser: UsersSlice };
export const store = configureStore({
  reducer: rootReducer,
});
