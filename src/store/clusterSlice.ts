import { createSlice } from "@reduxjs/toolkit";

interface ClusterState {
  isClustered: boolean;
}

const initialState: ClusterState = {
  isClustered: false,
};

const clusterSlice = createSlice({
  name: "cluster",
  initialState,
  reducers: {
    toggleCluster(state) {
      state.isClustered = !state.isClustered;
    },
    setCluster(state, action: { payload: boolean }) {
      state.isClustered = action.payload;
    },
  },
});

export const { toggleCluster, setCluster } = clusterSlice.actions;

export default clusterSlice.reducer;
