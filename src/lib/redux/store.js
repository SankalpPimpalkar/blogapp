import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/auth";

const reduxStore = configureStore({
    reducer: {
        auth: authSliceReducer,
    }
})

export default reduxStore