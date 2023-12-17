// Assuming your Redux slice is in a file like floorSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ZoomConfigState {
    scale : number,
    height : number,
    width : number,
    heightPerc : number,
    widthPerc : number
}

const initialState: ZoomConfigState = {
    scale : 1,
    height : 85400,
    width : 91800,
    heightPerc : 100,
    widthPerc : 100
};

const zoomSlice = createSlice({
  name: "zoomConfig",
  initialState,
  reducers: {
    UPDATE_ZOOM_SCALE : (state, action: PayloadAction<number>)=> {
        state.scale = action.payload
        return state
    },
    UPDATE_ZOOM_HEIGHT : (state, action: PayloadAction<number>)=> {
        state.height = action.payload
        return state
    },
    UPDATE_ZOOM_WIDTH : (state, action: PayloadAction<number>)=> {
        state.width = action.payload
        return state
    },
    UPDATE_ZOOM_HEIGHT_PERC: (state, action: PayloadAction<number>)=> {
        state.heightPerc = action.payload
        return state
    },
    UPDATE_ZOOM_WIDTH_PERC: (state, action: PayloadAction<number>)=> {
        state.widthPerc = action.payload
        return state
    }
    }
  })

export const {UPDATE_ZOOM_SCALE, UPDATE_ZOOM_HEIGHT, UPDATE_ZOOM_WIDTH, UPDATE_ZOOM_HEIGHT_PERC, UPDATE_ZOOM_WIDTH_PERC} = zoomSlice.actions;
export default zoomSlice.reducer;

export const GET_ZOOM_STATE = (state: RootState) => state.zoomConfig;
export const GET_ZOOM_SCALE = (state: RootState) => state.zoomConfig.scale;
export const GET_ZOOM_HEIGHT = (state: RootState) => state.zoomConfig.height;
export const GET_ZOOM_WIDTH = (state: RootState) => state.zoomConfig.width;
export const GET_ZOOM_HEIGHT_PERC = (state: RootState) => state.zoomConfig.heightPerc;
export const GET_ZOOM_WIDTH_PERC = (state: RootState) => state.zoomConfig.widthPerc;
