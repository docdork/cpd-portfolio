import React from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";

import styles from "../styles";


export default function CPDListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CPD List Screen</Text>
      

      <StatusBar style="auto" />
    </View>
  );
}
