import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  }
  return {};
};

const initialState = {
  items: getInitialState(),
};

const saveToLocalStorage = (items) => {
  localStorage.setItem("user", JSON.stringify(items));
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      const user = action.payload;
      state.items = user;
      saveToLocalStorage(state.items);
    },
    getUserInfo: (state) => {
      return state.items;
    },
  },
  
});

export const { addUserInfo, getUserInfo } = userSlice.actions;

export default userSlice.reducer;
