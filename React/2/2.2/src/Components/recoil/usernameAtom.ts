import { atom } from "recoil";

export const usernameState = atom({
  key: "usernameState", // unique ID (with respect to other atoms/selectors)
  default: "Guest", // default value (aka initial value)
});
