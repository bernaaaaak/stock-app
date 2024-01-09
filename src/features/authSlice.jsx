/* import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",

  initialState: {},
  reducers: {},
})

export const {} = authSlice.actions
export default authSlice.reducer */

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: "",
  loading: "false",
  error: "false",
  token: "",

}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.user.username
      state.token = payload.token
    },
    /* değişen varsa */ registerSuccess: () => { },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  }
});

export const { fetchStart, loginSuccess, fetchFail } = authSlice.actions

export default authSlice.reducer
