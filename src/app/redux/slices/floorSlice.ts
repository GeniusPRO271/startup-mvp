import BuildingLayer from "@/types/BuildingLayer"
import Floor from "@/types/Floor"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import exp from "constants"

// THIS IS AN EXAMPLE 

type InitialState = {
    floorNumber:number
    layers:Array<BuildingLayer>
}
const initialState = {
    floorNumber: 0,
    layers: []
} as InitialState

export const floor = createSlice({
    name: "floor",
    initialState,
    reducers: {
        clearLayers: () => {
            return initialState
        },
        addLayer: (state, action: PayloadAction<BuildingLayer>) => {
            console.log("adding layer", action.payload)
            state.layers.push(action.payload)
            console.log(state.layers)
            return state
        }
    }
})

export const {clearLayers, addLayer} = floor.actions;
export default floor.reducer;

// THIS IS AN EXAMPLE