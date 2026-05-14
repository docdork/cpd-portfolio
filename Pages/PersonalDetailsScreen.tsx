import React from "react";
import { StatusBar, View, Text, Button, Pressable } from "react-native";

import styles from "../styles";

export default function PersonalDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Details Screen</Text>

      <StatusBar barStyle="default" />
    </View>
  );
}
