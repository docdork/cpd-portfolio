import React from "react";
import { StatusBar, View, Text, Button, Pressable } from "react-native";

import styles from "../styles";

export default function PersonalDetailsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.personalDetailsContainer}>
      <View style={styles.personalDetailsContainer}>
        <Text style={styles.personalDetailsTitle}>Personal Details</Text>
      </View>
      <View style={styles.personalDetailsContainer}>
        <Text style={styles.personalDetailsItem}>Name: John Doe</Text>
      </View>
      <View style={styles.personalDetailsContainer}>
        <Text style={styles.personalDetailsItem}>Service Number: 25056936</Text>
      </View>
      <View style={styles.personalDetailsContainer}>
        <Text style={styles.personalDetailsItem}>Rank: Sergeant</Text>
      </View>
      <View style={styles.personalDetailsContainer}>
        <Text style={styles.personalDetailsItem}>Unit: RCDM</Text>
      </View>
      <View style={styles.personalDetailsContainer}>
        <Text style={styles.personalDetailsItem}>
          Email: john.doe@example.co.uk
        </Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#023f4e" : "#047726" },
        ]}
        onPress={() => alert("Edit Personal Details")}
      >
        <Text style={styles.buttonText}>Edit Personal Details</Text>
      </Pressable>
    </View>
  );
}
