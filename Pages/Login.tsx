import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "../styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    // Handle login logic here, e.g., form validation, API call, etc.
    console.log(
      "Login pressed with username:",
      username,
      "password:",
      password,
    );
    setLoggedIn(true);
    // Navigate to the Home screen after successful login
    navigation.navigate("Home");
  };

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={[styles.input, { width: "80%" }]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.input, { width: "80%" }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable
          style={[
            styles.button,
            { backgroundColor: "#047726", padding: 10, borderRadius: 5 },
          ]}
          onPress={handleLogin}
        >
          <Text style={{ color: "white", padding: 10 }}>Login</Text>
        </Pressable>
      </KeyboardAvoidingView>
    
  );
};

export default Login;
