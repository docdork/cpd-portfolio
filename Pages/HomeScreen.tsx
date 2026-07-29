import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Pressable, Modal, TextInput } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import styles from "../styles";
import Logo from "../Components/Logo";

type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
};

export default function HomeScreen() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const logout = () => {
    // Handle logout logic here, e.g., clearing user data, resetting state, etc.
    console.log("User logged out");
    setLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {/* Welcome message, logo, and instructions for the home screen */}
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <Logo width={200} height={200} />
      </View>
      <Text style={[styles.homeTitle]}>Welcome to the CPD App</Text>

      <Text style={styles.subtitle}>
        Manage your Continuing Professional Development
      </Text>
      <Text style={styles.description}>
        Use the menu in the top left corner to navigate.
      </Text>
      <Pressable
        onPress={() => {
          if (loggedIn) {
            logout();
          }
          if (!loggedIn) {
            navigation.navigate("Login");
          }

        }}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#023f4e" : "#047726" },
        ]}
      >
        <Text style={styles.buttonText}>{loggedIn ? "Logout" : "Login"}</Text>
      </Pressable>
      {!loggedIn && (
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#023f4e" : "#047726" },
        ]}
        onPress={() => {
          // Navigate to the SignUp screen when the button is pressed
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
