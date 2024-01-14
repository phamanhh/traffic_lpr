import { createContext } from "react";

const UserInfoContext = createContext(null)

export const UserContextProvider = UserInfoContext.Provider;
export default UserInfoContext;