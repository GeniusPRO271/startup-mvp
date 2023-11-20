// Assuming your Redux slice is in a file like floorSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ButtonState {
    activeButton: string,
    IsbuttonActive: boolean;
}

const initialState: ButtonState = {
  activeButton: "",
  IsbuttonActive: false,
};

const buttonSlice = createSlice({
  name: "buttonSlice",
  initialState,
  reducers: {
        changeState: (state, action: PayloadAction<ButtonState>) => {
            state.activeButton = action.payload.activeButton
            state.IsbuttonActive = action.payload.IsbuttonActive
            return state
        },
        changeActiveButton: (state, action: PayloadAction<string>) => {
            state.activeButton = action.payload
            state.IsbuttonActive = false
            return state
        },
        changeIsButtonActive: (state, action: PayloadAction<boolean>) => {
            state.IsbuttonActive = action.payload
            return state
        }
    }
  })

export const {changeActiveButton,changeState,changeIsButtonActive} = buttonSlice.actions;
export default buttonSlice.reducer;

export const selectActiveButton = (state: RootState) => state.buttonSlice.activeButton;
export const selectIsbuttonActive = (state: RootState) => state.buttonSlice.IsbuttonActive;