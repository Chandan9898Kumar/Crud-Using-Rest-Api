import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showProjectTitle: "",
};

const ShowProjectSlice = createSlice({
  name: "Show Project Component",
  initialState,
  reducers: {
    showProjectTitle(state, action) {
      return {
        ...state,
        showProjectTitle: action.payload,
      };
    },
  },
});


// Action creators are generated for each case reducer function
export const { showProjectTitle } = ShowProjectSlice.actions;
export default ShowProjectSlice.reducer;
