import React from "react";
import { StatusBar, View, Text, Button, Pressable } from "react-native";

import styles from "../styles";

export default function PersonalDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Details Screen</Text>
      <Pressable
        onPress={() => navigation.navigate("HomeScreen")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </Pressable>
      <StatusBar barStyle="default" />
    </View>
  );
}
