import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            console.log(action.payload)
            state.user = action.payload
        },
    },
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer
