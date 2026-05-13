import React from "react";
import { StatusBar, View, Text, StyleSheet, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../router";


type Props = NativeStackScreenProps<RootStackParamList>;

export default function PersonalDetailsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text >Personal Details Screen</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
      <StatusBar barStyle="default" />
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
