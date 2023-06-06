import { combineReducers, configureStore } from "@reduxjs/toolkit";
import articleListSlice from "./reducer/articleListSlice";

const rootReducer = combineReducers({
    articleListSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']