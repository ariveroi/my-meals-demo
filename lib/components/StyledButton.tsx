import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type StyledButtonProps = {
  text: string;
  loading?: boolean;
  onClick: () => void;
  style?: {
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
  };
};

function StyledButton({ text, loading, onClick, style }: StyledButtonProps) {
  const colorsStyle = StyleSheet.create({ button: { ...style } });
  return (
    <TouchableOpacity
      disabled={loading}
      style={[
        styles.button,
        style
          ? colorsStyle.button
          : { backgroundColor: loading ? "#f8c6d1" : "#e91e63" }, // Conditional style
      ]}
      onPress={onClick}
    >
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} color="#555555" />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

export default StyledButton;

const styles = StyleSheet.create({
  button: {
    padding: 10, // Padding around the button
    borderRadius: 5, // Rounded corners
    width: "80%", // Width relative to its container
    alignItems: "center", // Align items in the center horizontally
    justifyContent: "center", // Align items in the center vertically
    flexDirection: "row", // Layout children in a row
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16, // Font size
    fontWeight: "bold", // Font weight
    textAlign: "center", // Center the text
    opacity: 1, // Full opacity
  },
  activityIndicator: {
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
  },
});
