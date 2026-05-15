import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";

import styles from "../styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={[styles.homeTitle]}>Welcome to the CPD App</Text>
      <Image
        source={require("../assets/Cyber_&_Specialist_Operations_Command_logo.png")}
        style={styles.homeImage}
        resizeMode="contain"
        alt="CSOC Logo"
        accessibilityLabel="CSOC Logo"
        accessibilityRole="image"
      />
      <Text style={styles.subtitle}>
        Manage your Continuing Professional Development
      </Text>
      <Text style={styles.description}>
        Use the menu in the top left corner to navigate.
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}
