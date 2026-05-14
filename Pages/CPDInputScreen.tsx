import React from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";

import styles from "../styles";

export default function CPDInputScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CPD Input Screen</Text>

      <Pressable
        onPress={() => navigation.navigate("HomeScreen")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
