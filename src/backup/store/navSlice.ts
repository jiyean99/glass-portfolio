import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "navigation",
  initialState: { isOpen: false },
  reducers: {
    toggleNav(state) {
      state.isOpen = !state.isOpen;
    },
    openNav(state) {
      state.isOpen = true;
    },
    closeNav(state) {
      state.isOpen = false;
    },
  },
});

export const { toggleNav, openNav, closeNav } = navSlice.actions;
export default navSlice.reducer;
