import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("https://cpd-backend-6f7044c48b89.herokuapp.com/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            // save the user to local storage
            await SecureStore.setItemAsync("user", JSON.stringify(json));

            const user = await SecureStore.getItemAsync("user");
            console.log("User saved to SecureStore:", user);

            // update the auth context
            dispatch({ type: "LOGIN", payload: json });
            setIsLoading(false);
            console.log("User logged in:", json);
        }
    };

    return { login, isLoading, error };
};
