import { useSelector } from "react-redux";
import { FetchApi } from "./FetchApi";
import { setAuth } from "@/redux/slice/authSlice";
import {store} from "@/redux/store";

export const refetchAuthState = async (auth) => {
  try {
    const res = await FetchApi({
      url: `/user/getUserById/${auth?.user._id}`, callback: () => {
      }
    })
    if (res.status === 200) {
      const newObj = {
        ...auth,
        user: res.data.user,
      }
      if (!res.data.user.isActive) {
        store.dispatch(setAuth({}))
        return window.location = '/login'
      }
      store.dispatch(setAuth(newObj))
    }
  } catch (error) {
    store.dispatch(setAuth({}))
    window.location = '/login'
  }
}

export const useAuth = () => {
  const auth = useSelector((state) => state.auth?.user);
  return {
    auth: auth,
    refetchAuth: () => refetchAuthState(auth),
    setAuth: (user) => {
      store.dispatch(setAuth(user))
    }
  }
}
export const loginUser = async (email, password) => {
  try {
    const res = await FetchApi({ url: '/admin/signInAllUsers', method: 'post', data: { email, password }, })
    if (res?.status === 200) {
      if (res?.data?.user?.role === 'MP') {
        store.dispatch(setAuth(res?.data))
        window.location = '/dashboard'
      } else {
        toast.error('Invalid email or password.')
      }
    }

    return res;
  } catch (error) {
    toast.error(error.response.data.message || error.message)
    console.error(error)
  }
}
export const logoutUser = () => {
  store.dispatch(setAuth({}))
  window.location = '/login'

}
export const isEmptyArrowFunction = (func) => {
  console.log(func)
  return func.toString() === '()=>{}';
};