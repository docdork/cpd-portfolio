import { useState } from "react";
import { TextInput, Pressable, Text, KeyboardAvoidingView, Platform } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import validate from "react-native-email-validator";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validEmail, setValidEmail] = useState(true);

  const handleSignUp = () => {
    // Handle sign-up logic here, e.g., form validation, API call, etc.

    console.log(
      "Sign Up pressed with email:",
      email,
      "password:",
      password,
      "confirmPassword:",
      confirmPassword,
    );
  };

  const checkEmail = (text: string) => {
    setEmail(text);
    if (!validate(text)) {
      console.log("Invalid email format");
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  const checkPasswordsMatch = (text: string) => {
    setConfirmPassword(text);
    setPasswordsMatch(password === text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
        <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={[styles.input, { width: "80%" }]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          checkEmail(text);
          console.log("Email changed to:", email);
        }}
      />
      {!validEmail && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          Invalid email format!
        </Text>
      )}
      <TextInput
        style={[styles.input, { width: "80%" }]}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          checkPasswordsMatch(text);
        }}
        secureTextEntry
      />
      <TextInput
        style={[styles.input, { width: "80%" }]}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          checkPasswordsMatch(text);
        }}
        secureTextEntry
      />
      {!passwordsMatch && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          Passwords do not match!
        </Text>
      )}
      <Pressable
        onPress={handleSignUp}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#023f4e" : "#047726" },
          !passwordsMatch && { backgroundColor: "gray" },
          !validEmail && { backgroundColor: "gray" },
        ]}
        disabled={!passwordsMatch || !validEmail}
      >
        <Text style={{ color: "#fff" }}>Sign Up</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default Signup;
