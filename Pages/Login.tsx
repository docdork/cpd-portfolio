import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "../styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import validate from "react-native-email-validator";

import { useLogin } from "../hooks/useLogin";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Login = () => {
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [email, setEmail] = useState("");

  const { login, error, isLoading } = useLogin();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    await login(email, password);
    if (!error) {
      navigation.navigate("Home");
    }
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, { width: "80%" }]}
        placeholderTextColor="#000"
        placeholder="Email"
        value={email}
        onChangeText={checkEmail}
      />
      {!validEmail && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          Please enter a valid email address.
        </Text>
      )}
      <TextInput
        style={[styles.input, { width: "80%" }]}
        placeholderTextColor="#000"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable
        disabled={isLoading || !email || !password || !validEmail}
        style={[
          styles.button,
          { backgroundColor: "#047726", padding: 10, borderRadius: 5 },
          !validEmail && { backgroundColor: "gray" },
          isLoading && { backgroundColor: "gray" },
          !email && { backgroundColor: "gray" },
          !password && { backgroundColor: "gray" },
        ]}
        onPress={handleLogin}
      >
        <Text style={{ color: "white", padding: 10 }}>Login</Text>
      </Pressable>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </KeyboardAvoidingView>
  );
};

export default Login;
