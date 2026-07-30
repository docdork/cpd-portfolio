import { useState } from "react";
import * as SecureStore from "expo-secure-store";

import {useAuthContext} from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("https://cpd-backend-6f7044c48b89.herokuapp.com/api/user/signup", {
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
        console.log("User signed up and logged in:", json);
    }
  };

  return { signup, isLoading, error };
};