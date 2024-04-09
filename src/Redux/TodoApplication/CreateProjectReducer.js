import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createProjectTitle: "",
};

const CreateProjectSlice = createSlice({
  name: "Create Project Component",
  initialState,
  reducers: {
    createProjectTitle(state, action) {
      return {
        ...state,
        createProjectTitle: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { createProjectTitle } = CreateProjectSlice.actions;

export default CreateProjectSlice.reducer;
