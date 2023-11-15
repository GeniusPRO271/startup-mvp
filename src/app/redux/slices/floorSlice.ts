// Assuming your Redux slice is in a file like floorSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Floor from "@/types/Floor";
import { RootState } from "../store";

interface FloorState {
  selectedFloor: string,
  floors: any[];
}

const initialState: FloorState = {
  selectedFloor: "Story1",
  floors: [],
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

    }
  },
});

export const { addFloors, clearFloors,replaceFloors,changeActiveFloor} = floorSlice.actions;
export default floorSlice.reducer;

export const selectFloors = (state: RootState) => state.floorReducer.floors;
export const selectActiveFloor = (state: RootState) => state.floorReducer.selectedFloor;