import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/redux/slice/categorySlice";
import productsReducer from "@/redux/slice/productsSlice";
import ordersReducer from "@/redux/slice/orderSlice";
import usersReducer from "@/redux/slice/userSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productsReducer,
    orders: ordersReducer,
    users: usersReducer,
  },
});

export default store;
