import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import StyledButton from "@/lib/components/StyledButton";
import ErrorMessage from "@/lib/components/ErrorMessage";

type LoginProps = {
  username: string;
  password: string;
  error: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  handleSignIn: () => void;
  loading: boolean;
};

const Login = ({
  username,
  password,
  error,
  setUsername,
  setPassword,
  handleSignIn,
  loading,
}: LoginProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginForm}>
        <Text style={styles.loginHeader}>Login</Text>
        <View style={styles.loginField}>
          <Text>Email</Text>
          <TextInput
            value={username}
            onChangeText={(text: string) => setUsername(text)}
            style={styles.loginInput}
            placeholder="Email..."
            keyboardType="email-address"
          />
        </View>
        <View style={styles.loginField}>
          <Text>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            secureTextEntry
            style={styles.loginInput}
            placeholder="Password..."
          />
        </View>

        <View style={styles.logginButton}>
          <StyledButton loading={loading} text="Login" onClick={handleSignIn} />
        </View>
      </View>
      {error !== "" ? (
        <ErrorMessage errorText={error} />
      ) : (
        <View style={styles.errorPlaceholder} /> // Empty container to hold space
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#f5f5f5", // A light grey or off-white background
    alignItems: "center",
    justifyContent: "center",
  },
  loginForm: {
    backgroundColor: "white",
    width: "85%",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  loginHeader: {
    color: "#333", // A softer color than black
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20, // Added some space below the header
  },
  loginField: {
    width: "100%",
    marginVertical: 12, // Increased margin for spacing
  },
  loginInput: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0", // A softer shade for the border
    fontSize: 16, // Adjusted font size for readability
    padding: 10,
  },
  logginButton: {
    width: "100%", // Full width button
    marginTop: 20,
    alignItems: "center",
  },
  errorPlaceholder: {
    height: 50, // Placeholder height for error message
  },
});
