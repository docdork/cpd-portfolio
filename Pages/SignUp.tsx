import { Pressable, Text } from "react-native";
import styles from "../styles";
import { useHostedAuth } from "@clerk/expo/hosted-auth";

const Signup = () => {
  const { startHostedAuth } = useHostedAuth();

  const handleSignUp = async () => {
    try {
      await startHostedAuth({ mode: "sign-up" });
    } catch (error) {
      console.error("Error starting hosted auth:", error);
    }
  };

  return (
    <>
      <Text style={styles.subtitle}>New to the app?</Text>
      <Pressable onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign up with Clerk</Text>
      </Pressable>
    </>
  );
};

export default Signup;
