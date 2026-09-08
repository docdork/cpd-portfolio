import React from "react";
import { Pressable, Text } from "react-native";
import styles from "../styles";
import { useHostedAuth } from "@clerk/expo/hosted-auth";

const Login = () => {
  const { startHostedAuth } = useHostedAuth();

  const handleLogin = async () => {
    try {
      await startHostedAuth({ mode: "sign-in" });
    } catch (error) {
      console.error("Error starting hosted auth:", error);
    }
  };

  return (
    <>
      <Text style={styles.subtitle}>Already have an account?</Text>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in with Clerk</Text>
      </Pressable>
    </>
  );
};

export default Login;
