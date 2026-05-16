import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Pressable, Modal, TextInput } from "react-native";

import styles from "../styles";
import Logo from "../Components/Logo";

export default function HomeScreen() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  return (
    <View style={styles.container}>
      {/* Welcome message, logo, and instructions for the home screen */}
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <Logo width={200} height={200} />
      </View>
      <Text style={[styles.homeTitle]}>Welcome to the CPD App</Text>

      <Text style={styles.subtitle}>
        Manage your Continuing Professional Development
      </Text>
      <Text style={styles.description}>
        Use the menu in the top left corner to navigate.
      </Text>
      <Pressable onPress={() => {
        loggedIn ? setLoggedIn(false) :  setLoggingIn(true);
      } } style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#023f4e" : "#047726" },
      ]}>
        <Text style={styles.buttonText}>{loggedIn ? "Logout" : "Login"}</Text>
      </Pressable>
      <Modal
        visible={loggingIn}
        onRequestClose={() => setLoggedIn(false)}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Login</Text>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>Username</Text>
            <TextInput style={styles.input} placeholder="Username" />
            <Text style={styles.modalLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? "#023f4e" : "#047726" },
            ]}
            onPress={() => [setLoggedIn(true), setLoggingIn(false)]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}
