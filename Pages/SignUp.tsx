import { useState } from "react";
import { TextInput, Pressable, Text, View } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSignUp = () => {
    // Handle sign-up logic here, e.g., form validation, API call, etc.
    
    console.log(
      "Sign Up pressed with email:",
      email,
      "password:",
      password,
      "confirmPassword:",
      confirmPassword,
    );

   
  };

  const checkPasswordsMatch = () => {
    setPasswordsMatch(password === confirmPassword);
  };

  return (
    <View style={styles.container }>
      <TextInput
        style={[styles.input, { width: "80%" }]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { width: "80%" }]}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          checkPasswordsMatch();
        }}
        secureTextEntry
      />
      <TextInput
        style={[styles.input, { width: "80%" }]}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          checkPasswordsMatch();
        }}
        secureTextEntry
      />
        {!passwordsMatch && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          Passwords do not match!
        </Text>
      )}
      <Pressable

        style={({ pressed }) => [
          styles.button,
            { backgroundColor: pressed ? "#023f4e" : "#047726" },
        ]}
        
        onPress={handleSignUp}
      >
        <Text style={{ color: "#fff" }}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default Signup;
