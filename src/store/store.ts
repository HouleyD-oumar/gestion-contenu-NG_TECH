import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import contentReducer from "./slices/contentSlice";
import userReducer from "./slices/userSlice";
import logReducer from "./slices/logSlice";
import uiReducer from "./slices/uiSlice";
import statusReducer from "./slices/statusSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    users: userReducer,
    logs: logReducer,
    ui: uiReducer,
    status: statusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
