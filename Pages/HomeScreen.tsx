import React from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";

import styles from "../styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <Pressable
        onPress={() => navigation.navigate("PersonalDetailsScreen")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Personal Details</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("CPDListScreen")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>CPD List</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("CPDInputScreen")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>CPD Input</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
