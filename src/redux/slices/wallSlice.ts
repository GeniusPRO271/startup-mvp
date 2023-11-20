// Assuming your Redux slice is in a file like floorSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface WallSerialized{
    Coords: Array<Array<number>>;
    Id: string;
    Color: string;
    FillColor: string;
    lineCords: Array<number>;
}
interface WallState{
    wall: WallSerialized
    showWallInfo : boolean
}

const initialState: WallState = {
    wall: {
        Coords: [[]],
        Id: "",
        Color: "",
        FillColor: "",
        lineCords: []
    },
    showWallInfo: false
};

const wallSlice = createSlice({
  name: "wall",
  initialState,
  reducers: {
    changeSelectedWall :(state, action: PayloadAction<WallSerialized>) => {
        state.wall = action.payload
        return state
    },
    changeShowWallInfo :(state, action: PayloadAction<boolean>) => {
        state.showWallInfo = action.payload
        return state
    }
  },
});

export const { changeSelectedWall, changeShowWallInfo} = wallSlice.actions;
export default wallSlice.reducer;

export const selectWall = (state: RootState) => state.wallSlice.wall;
export const selectShowWallInfo = (state: RootState) => state.wallSlice.showWallInfo;
export const selectWallSlice = (state: RootState) => state.wallSlice;
