// Assuming your Redux slice is in a file like floorSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export interface WallSerialized{
    Coords: Array<Array<number>>;
    Id: string;
    Color: string;
    FillColor: string;
    Join: JoinsSerialized;
    wallLength: number;
    wallOrientation : string
    Infimo: JoinSerialized;
    Supremo: JoinSerialized;
}

export interface JoinsSerialized{
    Coords: Array<Array<number>>;
    Id: string;
    PairOfJoins: Array<JoinSerialized>;
}
export interface JoinSerialized{
    Coords: Array<number>
    Id:string
    Orientation: string
    Color: string
    FillColor: string
}

interface selectedState{
    wall: WallSerialized
    join : JoinSerialized
    valueInput: string
    showWallInfo : boolean
    id :string
}




const initialState: selectedState = {
    wall: {
        Coords: [[]],
        Id: "",
        Color: "",
        FillColor: "",
        Join: {
            Coords: [[],[]],
            Id: "",
            PairOfJoins: [{
                Coords: [],
                Id: "",
                Orientation: "",
                Color: "",
                FillColor: ""
            }]
        },
        wallLength: 0,
        wallOrientation : "",
        Infimo: {
            Coords: [0,0],
            Id: "",
            Orientation: "",
            Color: "",
            FillColor: ""
        },
        Supremo: {
            Coords: [0,0],
            Id: "",
            Orientation: "",
            Color: "",
            FillColor: ""
        }
    },
    join:{
        Coords: [0,0],
        Id: "",
        Orientation: "",
        Color: "",
        FillColor: ""
    },
    valueInput: "",
    showWallInfo: false,
    id : ""
};

const selectionSlice = createSlice({
  name: "selectionSlice",
  initialState,
  reducers: {
    changeSelectedWall :(state, action: PayloadAction<WallSerialized>) => {
        state.wall = action.payload
        
        return state
    },
    changeShowWallInfo :(state, action: PayloadAction<boolean>) => {
        state.showWallInfo = action.payload
        return state
    },
    changeSelectedJoin :(state, action: PayloadAction<JoinSerialized>) => {
        try{
            const match = action.payload.Id.match(/.+_(\d+)/);
            if (match){
                const numberFromPayloadId = parseInt(match[1])
                if(parseInt(state.wall.Id) == numberFromPayloadId){
                    state.join = action.payload
                    state.id = action.payload.Id
                }
            }
            return state
        }catch(err){
            console.log("ERROR AT changeSelectedJoin ", err)
        }
    },
    clearSelectedState :(state, action: PayloadAction<boolean>) => {
        state = initialState
        return state
    },   
    changeSelectedValueInput :(state, action: PayloadAction<string>) => {
        try{
            state.valueInput = action.payload
            return state
        }
        catch(err){
            console.log("ERROR AT changeSelectedJoin ", err)
        }
    },
  },
});

export const { changeSelectedWall, changeShowWallInfo,changeSelectedJoin,clearSelectedState, changeSelectedValueInput} = selectionSlice.actions;
export default selectionSlice.reducer;

export const selectWall = (state: RootState) => state.selectionSlice.wall;
export const selectValueInput = (state: RootState) => state.selectionSlice.valueInput;
export const selectShowWallInfo = (state: RootState) => state.selectionSlice.showWallInfo;
export const selectJoin = (state: RootState) => state.selectionSlice.join;
export const selectSelectionSlice = (state: RootState) => state.selectionSlice;


