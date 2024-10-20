import { useSelector } from "react-redux";
import { FetchApi } from "./FetchApi";
import { setAuth } from "@/redux/slice/authSlice";
import { store } from "@/redux/store";

export const refetchAuthState = async (auth) => {
  try {
    const res = await FetchApi({
      url: `/user/getUserById/${auth?.user._id}`,
      callback: () => {},
    });
    if (res.status === 200) {
      const newObj = {
        ...auth,
        user: res.data.user,
      };
      if (!res.data.user.isActive) {
        store.dispatch(setAuth({}));
        return (window.location = "/login");
      }
      store.dispatch(setAuth(newObj));
    }
  } catch (error) {
    store.dispatch(setAuth({}));
    window.location = "/login";
  }
};

export const useAuth = () => {
  const auth = useSelector((state) => state.auth?.user);
  return {
    auth: auth,
    refetchAuth: () => refetchAuthState(auth),
    setAuth: (user) => {
      store.dispatch(setAuth(user));
    },
  };
};
export const loginUser = async (email, password) => {
  try {
    const res = await FetchApi({
      url: "/admin/signInAllUsers",
      method: "post",
      data: { email, password },
    });
    if (res?.status === 200) {
      if (res?.data?.user?.role === "MP") {
        store.dispatch(setAuth(res?.data));
        window.location = "/dashboard";
      } else {
        toast.error("Invalid email or password.");
      }
    }

    return res;
  } catch (error) {
    toast.error(error.response.data.message || error.message);
    console.error(error);
  }
};
export const logoutUser = () => {
  store.dispatch(setAuth({}));
  window.location = "/login";
};
export const isEmptyArrowFunction = (func) => {
  return func.toString() === "()=>{}";
};

export const getOrderStatusStyle = (status) => {
  return {
    backgroundColor:
      status === "pending"
        ? "#FFD580"  // Muted orange for Pending
        : status === "processing"
        ? "#87CEEB"  // Light sky blue for Processing
        : status === "shipped"
        ? "#ADD8E6"  // Soft blue for Shipped
        : status === "delivered"
        ? "#90EE90"  // Light green for Delivered
        : status === "canceled"
        ? "#FFA07A"  // Soft red/orange for Canceled
        : "#C0C0C0", // Light grey for unknown status
  };
};
export const formatDate = (dateString) => {
  const date = new Date(dateString); // Parse the date string
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so +1
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits

  return `${year}-${month}-${day}`;
};
export const formatEndOfDay = (dateString) => {
  const date = new Date(dateString); // Parse the date string
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so +1
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits

  // Returning formatted string with end of day time "23:59:59"
  return `${year}-${month}-${day}T23:59:59`;
};
export const formatInternationalDate = (isoDateString) => {
  const date = new Date(isoDateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false, // use 24-hour format
  };

  return date.toLocaleString('en-US', options);
};