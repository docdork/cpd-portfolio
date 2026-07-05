import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const submitCPDEntry = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/competencies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: competenceName,
          expDate: expiryDate,
        }),
      });
      if (response.ok) {
        setModalVisible(true);
      }else {
        console.error("Failed to submit CPD entry:", response.statusText);
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.error("Error submitting CPD entry:", error);
      setErrorModalVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Title and input fields for competence name and expiry date */}
      <Text style={styles.title}>Competence:</Text>
      <View style={styles.inputContainer}>
        <Picker
          style={styles.picker}
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

      {/* Save button to log the entered competence and expiry date */}
      <Pressable
        disabled={!competenceName || !expiryDate}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#023f4e" : "#047726" },
        ]}
        onPress={submitCPDEntry}
      >
        <Text style={styles.buttonText}>Save CPD Entry</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Submitted!</Text>
          <View style={styles.modalContent}>
            <Text style={styles.modalItem}>
              {"Competence: " + competenceName}
            </Text>
            <Text style={styles.modalItem}>{"Expiry Date: " + expiryDate}</Text>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? "#023f4e" : "#047726" },
              ]}
              onPress={() => {
                setModalVisible(false);
                setCompetenceName("");
              }}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
        <Text>Modal Content</Text>
      </Modal>

      <Modal
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Error!</Text>
          <View style={styles.modalContent}>
            <Text style={styles.modalItem}>Failed to submit CPD entry.</Text>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? "#023f4e" : "#047726" },
              ]}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
