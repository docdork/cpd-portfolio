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
import { useAuth } from "@clerk/expo";

import styles from "../styles";
import { Picker } from "@react-native-picker/picker";

export default function CPDInputScreen() {
  const defaultStyles = useDefaultStyles();
  const [competenceName, setCompetenceName] = useState("");
  const [expiryDate, setExpiryDate] = useState<DateType>();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const { getToken } = useAuth();
  const submitCPDEntry = async () => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No Clerk session token available");
      }

      const response = await fetch(
        "https://cpd-backend-6f7044c48b89.herokuapp.com/api/competencies",
        // "http://10.197.208.166:4000/api/competencies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: competenceName,
            expDate: expiryDate,
          }),
        },
      );
      if (response.ok) {
        setModalVisible(true);
      } else {
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
          <Picker.Item
            label="Essential Competency Passport (Version 1)"
            value=""
          />
          <Picker.Item
            label="Care Certificate and/or Completion of CMT Initial Trade Training (Phase 2) - Once only"
            value="Care Certificate and/or Completion of CMT Initial Trade Training (Phase 2)"
          />
          <Picker.Item
            label="Disclosure and Barring Service (DBS)Enhanced Disclosure - 3 yearly"
            value="Disclosure and Barring Service (DBS) Enhanced Disclosure"
          />
          <Picker.Item
            label="Basic Life Support - Annual"
            value="Basic Life Support"
          />
          <Picker.Item label="Anaphylaxis - Annual" value="Anaphylaxis" />
          <Picker.Item
            label="Automated External Defibrillator - Annual"
            value="Automated External Defibrillator"
          />
          <Picker.Item
            label="Infection Prevention and Control - Annual"
            value="Infection Prevention and Control"
          />
          <Picker.Item
            label="Caldicott Level 1 (Defence Information Management Passport) - 3 yearly"
            value="Caldicott Level 1 (Defence Information Management Passport)"
          />
          <Picker.Item
            label="Caldicott Level 2 (Data Security Awareness) - Annual"
            value="Caldicott Level 2 (Data Security Awareness)"
          />
          <Picker.Item
            label="Manual Handling - Annual"
            value="Manual Handling"
          />
          <Picker.Item
            label="Significant Event Reporting (ASER) - Once only"
            value="Significant Event Reporting (ASER)"
          />
          <Picker.Item
            label="Healthcare Governance and Assurance - 2 yearly"
            value="Healthcare Governance and Assurance"
          />
          <Picker.Item
            label="Immunisation and Vaccination Training - 2 yearly"
            value="Immunisation and Vaccination Training"
          />
          <Picker.Item
            label="Medical Information Systems User (DMICP User) (if not a regular user) - 2 yearly"
            value="Medical Information Systems User (DMICP User) (if not a regular user)"
          />
          <Picker.Item
            label="Safeguarding Level 2 (adults and children) (includes Level 1) - 3 yearly"
            value="Safeguarding Level 2 (adults and children) (includes Level 1)"
          />
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
