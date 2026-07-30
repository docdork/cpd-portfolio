import * as SecureStore from "expo-secure-store";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // remove the user from local storage
        SecureStore.deleteItemAsync("user");
        // update the auth context
        dispatch({ type: "LOGOUT" });
    };

    return { logout };
};