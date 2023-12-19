// Assuming your Redux slice is in a file like floorSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface WallSerialized {
  Coords: Array<Array<number>>;
  Id: string;
  Color: string;
  FillColor: string;
  WallEndPoints: WallEndPointsSerialized;
}

interface WallEndPointsSerialized {
  Coords: Array<Array<number>>;
  Id: string;
  PairOfJoins: Array<WallEndPointSerialized>;
  WallEndPointsRestrictions: any;
  WallEndPointsIds: Array<string>;
}
interface WallEndPointSerialized {
  Coords: Array<number>;
  Id: string;
  Orientation: string;
  Color: string;
  FillColor: string;
  Infimo: number[];
  Supremo: number[];
  MaxLimit: number;
  MinLimit: number;
}

interface selectedState {
  wall: WallSerialized;
  join: WallEndPointSerialized;
  showWallInfo: boolean;
  isEditing: boolean;
  isScrolling:boolean
  isDrawing: boolean
  deleted: WallSerialized[];
}

const initialState: selectedState = {
  wall: {
    Coords: [[]],
    Id: "",
    Color: "",
    FillColor: "",
    WallEndPoints: {
      Coords: [],
      Id: "",
      PairOfJoins: [
        {
          Coords: [],
          Id: "",
          Orientation: "",
          Color: "",
          FillColor: "",
          Infimo: [0, 0],
          Supremo: [0, 0],
          MaxLimit: 0,
          MinLimit: 0,
        },
      ],
      WallEndPointsIds: ["0", "0"],
      WallEndPointsRestrictions: "",
    },
  },
  join: {
    Coords: [],
    Id: "",
    Orientation: "",
    Color: "",
    FillColor: "",
    Infimo: [0, 0],
    Supremo: [0, 0],
    MaxLimit: 0,
    MinLimit: 0,
  },
  showWallInfo: false,
  isEditing: false,
  isScrolling: false,
  isDrawing: false,
  deleted: [],
};

const selectionSlice = createSlice({
  name: "selectionSlice",
  initialState,
  reducers: {
    UPDATE_EDIT_STATE : (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload
      return state
    },
    UPDATE_SCROLL_STATE : (state, action: PayloadAction<boolean>) => {
      state.isScrolling = action.payload
      return state
    },
    UPDATE_DRAWING_STATE : (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload
      return state
    },
    UPDATE_SELECTED_WALL: (state, action: PayloadAction<WallSerialized>) => {
      state.wall = action.payload;
      return state;
    },
    UPDATE_SHOW_WALL_INFO_TOGGLE: (state, action: PayloadAction<boolean>) => {
      state.showWallInfo = action.payload;
      return state;
    },
    UPDATE_SELECTED_WALL_END_POINT: (
      state,
      action: PayloadAction<WallEndPointSerialized>
    ) => {
      state.join = action.payload;
      return state;
    },
    UPDATE_WALL_END_POINT_INFIMO: (state, action: PayloadAction<number[]>) => {
      const indexOfJoin = state.wall.WallEndPoints.PairOfJoins.findIndex(
        (d) => d.Id === state.join.Id
      );

      if (indexOfJoin !== -1) {
        state.wall.WallEndPoints.PairOfJoins[indexOfJoin].Infimo =
          action.payload;
      }

      state.join.Infimo = action.payload;
      return state;
    },
    UPDATE_WALL_END_POINT_SUPREMO: (state, action: PayloadAction<number[]>) => {
      const indexOfJoin = state.wall.WallEndPoints.PairOfJoins.findIndex(
        (d) => d.Id === state.join.Id
      );

      if (indexOfJoin !== -1) {
        state.wall.WallEndPoints.PairOfJoins[indexOfJoin].Supremo =
          action.payload;
      }

      state.join.Supremo = action.payload;
      return state;
    },
    ADD_WALL_TO_DELETED_LIST: (state, action: PayloadAction<WallSerialized>) => {
      state.deleted.push(action.payload);
      return state;
    },
    REMOVE_WALL_FROM_DELETED_LIST: (state, action: PayloadAction<WallSerialized>) => {
        let DELETE_ARRAY = state.deleted
        console.log("STATE_BEFORE_DELTED=", DELETE_ARRAY)
        state.deleted = state.deleted.filter(item => item.Id !== action.payload.Id)
        console.log("STATE_AFTER_DELTED=", DELETE_ARRAY)
        return state;
      },
    DELETE_ALL_STATES: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const {
  UPDATE_EDIT_STATE,
  UPDATE_SCROLL_STATE,
  UPDATE_DRAWING_STATE,
  UPDATE_SELECTED_WALL,
  UPDATE_SHOW_WALL_INFO_TOGGLE,
  UPDATE_SELECTED_WALL_END_POINT,
  UPDATE_WALL_END_POINT_INFIMO,
  UPDATE_WALL_END_POINT_SUPREMO,
  DELETE_ALL_STATES,
  ADD_WALL_TO_DELETED_LIST,
  REMOVE_WALL_FROM_DELETED_LIST,
} = selectionSlice.actions;
export default selectionSlice.reducer;

export const GET_SELECTED_WALL = (state: RootState) => state.selectionSlice.wall;
export const GET_SHOW_WALL_INFO_BOOL = (state: RootState) =>
  state.selectionSlice.showWallInfo;
export const GET_SELECTED_WALL_END_POINT = (state: RootState) => state.selectionSlice.join;
export const GET_ALL_DATA = (state: RootState) => state.selectionSlice;
export const GET_DELTED_LIST =  (state: RootState) => state.selectionSlice.deleted;
export const GET_EDIT_STATE =  (state: RootState) => state.selectionSlice.isEditing;
export const GET_SCROLL_STATE =  (state: RootState) => state.selectionSlice.isScrolling;
export const GET_DRAWING_STATE =  (state: RootState) => state.selectionSlice.isDrawing;
