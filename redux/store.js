import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/redux/slice/categorySlice";
import productsReducer from "@/redux/slice/productsSlice"; 

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productsReducer,
  },
});

export default store;
