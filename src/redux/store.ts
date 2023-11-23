import { configureStore } from '@reduxjs/toolkit'
import floorReducer from "./slices/floorSlice"
import buttonSlice from "./slices/buttonSlice"
import selectionSlice from "./slices/selectionSlice"
// THIS IS AN EXAMPLE
export const store = configureStore({
  reducer: {
    floorReducer,
    buttonSlice,
    selectionSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// THIS IS AN EXAMPLE