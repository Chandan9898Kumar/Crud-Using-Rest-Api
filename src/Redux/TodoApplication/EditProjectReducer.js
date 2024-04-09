import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  EditProjectTitle: "",
};

const EditProjectSlice = createSlice({
  name: "Edit Project Component",
  initialState,
  reducers: {
    EditProjectTitle(state, action) {
      return {
        ...state,
        EditProjectTitle: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { EditProjectTitle } = EditProjectSlice.actions;

export default EditProjectSlice.reducer;
