import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../router";

type Props = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

export default function CPDInputScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>CPD Input Screen</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
