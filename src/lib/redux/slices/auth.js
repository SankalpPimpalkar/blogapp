import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    user: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'AUTH',
    initialState: INITIAL_STATE,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
})

export const { login, logout } = authSlice.actions
const authSliceReducer = authSlice.reducer
export default authSliceReducer