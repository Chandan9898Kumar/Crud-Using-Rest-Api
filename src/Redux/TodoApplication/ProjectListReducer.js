import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectTitle: "",
};

const ProjectSlice = createSlice({
  name: "Project Base Component",
  initialState,
  reducers: {
    ProjectListTitle(state, action) {
      return {
        ...state,
        projectTitle: action.payload,
      };
    },
  },
});


// Action creators are generated for each case reducer function.
export const { ProjectListTitle } = ProjectSlice.actions;

export default ProjectSlice.reducer;
