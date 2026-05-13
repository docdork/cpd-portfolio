import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../router";

type Props = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Personal Details"
        onPress={() => navigation.navigate("PersonalDetailsScreen")}
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
