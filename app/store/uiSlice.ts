/**
 * Redux slice for managing UI-related state.
 * @module uiSlice
 *
 * @property {Object} initialState - The initial state of the UI slice
 * @property {boolean} initialState.globalLoading - Flag indicating global loading state
 *
 * @exports {Object} actions - Redux actions for UI state management
 * @exports {Function} setGlobalLoading - Action creator to set global loading state
 * @exports {Function} reducer - UI slice reducer
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalLoading: false,
};

// Redux slice for UI state management
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = uiSlice.actions;
export default uiSlice.reducer;
