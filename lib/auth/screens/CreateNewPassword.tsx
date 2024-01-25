import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StyledButton } from "@ariveroi/react-native-ui";

type LoginProps = {
  error: string;
  handleSetNewPassword: (password: string, confirmPassword: string) => void;
  loading: boolean;
};

const CreateNewPassword = ({
  error,
  handleSetNewPassword,
  loading,
}: LoginProps) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // For error message animation

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [error, fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginForm}>
        <Text style={styles.loginHeader}>Create New Password</Text>
        <View style={styles.loginField}>
          <Text>New Password</Text>
          <TextInput
            value={newPassword}
            onChangeText={(text: string) => setNewPassword(text)}
            secureTextEntry
            style={styles.loginInput}
            placeholder="Password..."
          />
        </View>
        <View style={styles.loginField}>
          <Text>Confirm Password</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={(text: string) => setConfirmPassword(text)}
            secureTextEntry
            style={styles.loginInput}
            placeholder="Confirm Password..."
          />
        </View>

        <View style={styles.logginButton}>
          <StyledButton
            loading={loading}
            text="Create"
            onClick={() => handleSetNewPassword(newPassword, confirmPassword)}
          />
        </View>
      </View>
      {error !== "" ? (
        <Animated.View
          style={[
            styles.errorContainer,
            { opacity: fadeAnim }, // Animate opacity when error is present
          ]}
        >
          {/* <Ionicons name="close-circle-outline" size={30} color="#cc0000" /> */}
          <Text style={styles.errorMessage}>{error}</Text>
        </Animated.View>
      ) : (
        <View style={styles.errorContainer} /> // Empty container to hold space
      )}
    </SafeAreaView>
  );
};

export default CreateNewPassword;

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
  errorContainer: {
    minHeight: 50, // Fixed height for the error container
    maxWidth: "90%",
    flexWrap: "wrap",
    opacity: 0, // Initially invisible
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#ffcccc", // Soft shade of red
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row", // Row alignment
  },
  errorMessage: {
    color: "#cc0000", // Soft shade of red for text
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
});
