import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ModalPayload } from "../../types";

export interface UIState {
  modalOpen: boolean;
  modal?: ModalPayload | null;
}

const initialState: UIState = { modalOpen: false, modal: null };

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalPayload>) {
      state.modalOpen = true;
      state.modal = action.payload;
    },
    closeModal(state) {
      state.modalOpen = false;
      state.modal = null;
    },
  },
});

export const { openModal, closeModal } = slice.actions;
export default slice.reducer;
