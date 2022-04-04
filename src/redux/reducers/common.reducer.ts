import { createSlice } from "@reduxjs/toolkit";
import { MessageDialogPayload } from "../../models/common.model";
import { RootState } from "../store";

const initialState: any = {
  isLoading: false,
  isLockScreen: false,
  messageDialog: {
    open: false,
  },
  confirmDialog: {
    open: false,
  },
};

const commonSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchWithLock: (state, payload) => {
      state.isLoading = true;
    },
    fetchWithLockSuccess: (state, payload) => {
      state.isLoading = false;
    },
    fetchWithoutLock: (state, payload) => {
      state.isLoading = true;
    },
    fetchWithoutLockSuccess: (state, payload) => {
      state.isLoading = false;
    },
    lockScreen: (state) => {
      state.isLockScreen = true;
    },
    unLockScreen: (state) => {
      state.isLockScreen = true;
    },
    messageDialog: (state, payload) => {
      state.messageDialog = { ...payload };
    },
    confirmDialog: (state, payload) => {
      state.confirmDialog = { ...payload };
    },
  },
});

//action
export const {
  fetchWithLock,
  fetchWithLockSuccess,
  fetchWithoutLock,
  fetchWithoutLockSuccess,
  lockScreen,
  unLockScreen,
  messageDialog,
  confirmDialog,
} = commonSlice.actions;

// selector
export const isLoading = (state: RootState) => state.common.isLoading;

// reducer
const commonReducer = commonSlice.reducer;
export default commonReducer;
