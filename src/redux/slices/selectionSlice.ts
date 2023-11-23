// Assuming your Redux slice is in a file like floorSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface WallSerialized{
    Coords: Array<Array<number>>;
    Id: string;
    Color: string;
    FillColor: string;
    wallLength: number;
    wallOrientation : string
}

interface JoinSerialized{
    Coords: Array<number>
    Id:string
    Orientation: string
    Color: string
    FillColor: string
}

interface selectedState{
    wall: WallSerialized
    join : JoinSerialized
    showWallInfo : boolean
    id :string
}




const initialState: selectedState = {
    wall: {
        Coords: [[]],
        Id: "",
        Color: "",
        FillColor: "",
        wallLength: 0,
        wallOrientation : "",
    },
    join:{
        Coords: [],
        Id: "",
        Orientation: "",
        Color: "",
        FillColor: ""
    },
    showWallInfo: false,
    id : ""
};

const selectionSlice = createSlice({
  name: "selectionSlice",
  initialState,
  reducers: {
    changeSelectedWall :(state, action: PayloadAction<WallSerialized>) => {
        state.wall = action.payload
        state.id = action.payload.Id
        return state
    },
    changeShowWallInfo :(state, action: PayloadAction<boolean>) => {
        state.showWallInfo = action.payload
        return state
    },
    changeSelectedJoin :(state, action: PayloadAction<JoinSerialized>) => {
        state.join = action.payload
        state.id = action.payload.Id
        return state
    },
    clearSelectedState :(state, action: PayloadAction<boolean>) => {
        state = initialState
        return state
    }
  },
});

export const { changeSelectedWall, changeShowWallInfo,changeSelectedJoin,clearSelectedState} = selectionSlice.actions;
export default selectionSlice.reducer;

export const selectWall = (state: RootState) => state.selectionSlice.wall;
export const selectShowWallInfo = (state: RootState) => state.selectionSlice.showWallInfo;
export const selectJoin = (state: RootState) => state.selectionSlice.join;
export const selectSelectionSlice = (state: RootState) => state.selectionSlice;


