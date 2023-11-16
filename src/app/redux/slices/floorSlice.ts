// Assuming your Redux slice is in a file like floorSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FloorState {
  selectedFloor: string,
  floors: any[];
  ShowfloorInfo: boolean,
}

const initialState: FloorState = {
  selectedFloor: "Story1",
  floors: [],
  ShowfloorInfo: false,
};

const floorSlice = createSlice({
  name: "floor",
  initialState,
  reducers: {
    addFloors: (state, action: PayloadAction<string>) => {
        try{
            state.floors.push(action.payload);
            return state
        } catch(err){
          console.log("ERROR AT addFloors: ", err)
        }
    },
    replaceFloors: (state, action: PayloadAction<string[]>) => {
        try{
            state.floors = action.payload;
            return state
        } catch(err){
          console.log("ERROR AT replaceFloors: ", err)
        }
    },
    clearFloors: (state) => {
      state.floors = [];
    },
    changeActiveFloor: (state, action: PayloadAction<string>) => {
      try{
        state.selectedFloor = action.payload
        return state
      }catch(err){
        console.log("ERROR AT changeActiveFloor: ", err)
      }

    },
    changeShowfloorInfo : (state, action: PayloadAction<boolean>) => {
      try{
        state.ShowfloorInfo = action.payload
        return state
      }catch(err){
        console.log("ERROR AT changeShowfloorInfo: ", err)
      }
    }
  },
});

export const { addFloors, clearFloors,replaceFloors,changeActiveFloor, changeShowfloorInfo} = floorSlice.actions;
export default floorSlice.reducer;

export const selectFloors = (state: RootState) => state.floorReducer.floors;
export const selectActiveFloor = (state: RootState) => state.floorReducer.selectedFloor;
export const selectShowfloorInfo = (state: RootState) => state.floorReducer.ShowfloorInfo;