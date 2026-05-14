import React from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";

import styles from "../styles";

export default function CPDInputScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CPD Input Screen</Text>

      
      <StatusBar style="auto" />
    </View>
  );
}
