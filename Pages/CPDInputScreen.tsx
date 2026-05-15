import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

import styles from "../styles";
import { Picker } from "@react-native-picker/picker";

export default function CPDInputScreen() {
  const defaultStyles = useDefaultStyles();
  const [competenceName, setCompetenceName] = useState("");
  const [expiryDate, setExpiryDate] = useState<DateType>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Competence:</Text>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={competenceName}
          onValueChange={(itemValue) => {
            setCompetenceName(itemValue);
            console.log("Selected Competence:", itemValue);
          }}
        >
          <Picker.Item label="Select Competence" value="" />
          <Picker.Item
            label="Advanced Life Support"
            value="Advanced Life Support"
          />
          <Picker.Item
            label="Paediatric Life Support"
            value="Paediatric Life Support"
          />
          <Picker.Item label="CBRN Clinical" value="CBRN Clinical" />
        </Picker>
      </View>
      <Text style={styles.title}>Expiry Date:</Text>
      <View style={styles.datePickerContainer}>
        <DateTimePicker
          locale="en-GB"
          styles={defaultStyles}
          mode="single"
          date={expiryDate}
          onChange={({ date }) => {
            setExpiryDate(date);
            console.log("Selected Expiry Date:", date);
          }}
        />
      </View>
      /

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#023f4e" : "#047726" },
        ]}
        onPress={() =>
          console.log(
            "CPD Entry Saved - Competence:",
            competenceName,
            "Expiry Date:",
            expiryDate,
          )
        }
      >
        <Text style={styles.buttonText}>Save CPD Entry</Text>
      </Pressable>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
