import { create } from "zustand";
import { IUserDetailType, IUserType } from "../model/UserType";

interface AuthStoreApi {
  user: (Omit<IUserType, 'details'> & {details: IUserDetailType}) | null;
  setAuthUser: (data: (Omit<IUserType, 'details'> & {details: IUserDetailType})) => void;
  getAuthUser: () => (Omit<IUserType, 'details'> & {details: IUserDetailType}) | null;
  signOutUser: () => void;
}

export const auth_store = create<AuthStoreApi>((set, get) => ({
  user:
    localStorage.getItem("user_auth") && localStorage.getItem("user_auth") != null
      ? JSON.parse(<string>localStorage.getItem("user_auth"))
      : null,
  setAuthUser: (user: (Omit<IUserType, 'details'> & {details: IUserDetailType})) => {
    localStorage.setItem("user_auth", JSON.stringify(user));
    set({ user: user });
  },
  getAuthUser: () => {
    return get().user
      ? get().user
      : localStorage.getItem("user_auth")
      ? JSON.parse(<string>localStorage.getItem("user_auth"))
      : null;
  },
  signOutUser: () => {
    set({ user: null });
    localStorage.removeItem("user_auth");
  }
}));
