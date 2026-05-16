import React, { useState } from "react";
import { StatusBar, View, Text, Button, Pressable, Modal } from "react-native";

import styles from "../styles";
import { color } from "react-native-elements/dist/helpers";
import { TextInput } from "react-native-gesture-handler";

export default function PersonalDetailsScreen() {
  // Temporary hardcoded personal details - replace with dynamic data source in future
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [name, setName] = useState("Dave Holliday");
  const [serviceNumber, setServiceNumber] = useState("25076936");
  const [rank, setRank] = useState("Pte");
  const [unit, setUnit] = useState("16th Regiment Royal Artillery");
  const [email, setEmail] = useState("Doc.Holliday@example.co.uk");

  return (
    // Main container for the personal details screen
    <View style={styles.container}>
      {/* Pressable component to display personal details and open edit modal */}
      <Pressable
        style={({ pressed }) => [
          styles.personalDetailsContainer,
          { backgroundColor: pressed ? "#023f4e" : "#043677" },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.personalDetailsContainer}>
          <View style={styles.personalDetailsContainer}>
            <Text style={styles.personalDetailsTitle}>Personal Details</Text>
            <Text style={[styles.text, { color: "#82c8f7" }]}>Tap to edit</Text>
          </View>
          <View style={styles.personalDetailsContainer}>
            <Text style={styles.personalDetailsItem}>Name: {name}</Text>
          </View>
          <View style={styles.personalDetailsContainer}>
            <Text style={styles.personalDetailsItem}>
              Service Number: {serviceNumber}
            </Text>
          </View>
          <View style={styles.personalDetailsContainer}>
            <Text style={styles.personalDetailsItem}>Rank: {rank}</Text>
          </View>
          <View style={styles.personalDetailsContainer}>
            <Text style={styles.personalDetailsItem}>Unit: {unit}</Text>
          </View>
          <View style={styles.personalDetailsContainer}>
            <Text style={styles.personalDetailsItem}>Email: {email}</Text>
          </View>
        </View>
      </Pressable>

      {/* Modal for editing personal details */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Personal Details</Text>
            <Text style={styles.modalLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              defaultValue={name}
              onChangeText={setName}
            />
            <Text style={styles.modalLabel}>Service Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Service Number"
              defaultValue={serviceNumber}
              onChangeText={setServiceNumber}
            />
            <Text style={styles.modalLabel}>Rank</Text>
            <TextInput
              style={styles.input}
              placeholder="Rank"
              defaultValue={rank}
              onChangeText={setRank}
            />
            <Text style={styles.modalLabel}>Unit</Text>
            <TextInput
              style={styles.input}
              placeholder="Unit"
              defaultValue={unit}
              onChangeText={setUnit}
            />
            <Text style={styles.modalLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              defaultValue={email}
              onChangeText={setEmail}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? "#023f4e" : "#047726" },
            ]}
            onPress={() => setConfirmationVisible(true)}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Confirmation modal to confirm changes before saving */}
      <Modal
        visible={confirmationVisible}
        onRequestClose={() => setConfirmationVisible(false)}
        animationType="fade"
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View style={styles.confirmationContainer}>
            <View style={styles.confirmationContent}>
              <Text style={styles.confirmationTitle}>Confirm Changes</Text>
              <Text style={styles.confirmationMessage}>
                Are you sure you want to save these changes?
              </Text>
              <View style={styles.confirmationButtons}>
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? "#023f4e" : "#047726" },
                  ]}
                  onPress={() => {
                    setConfirmationVisible(false);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? "#023f4e" : "#047726" },
                  ]}
                  onPress={() => [
                    setConfirmationVisible(false),
                    setModalVisible(false),
                  ]}
                >
                  <Text style={styles.buttonText}>No</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? "#023f4e" : "#047726" },
                  ]}
                  onPress={() => setConfirmationVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#023f4e" : "#047726" },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Edit Personal Details</Text>
      </Pressable>
    </View>
  );
}
