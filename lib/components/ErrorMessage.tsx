import { View, Text, Animated, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

type ErrorMessageProps = {
  errorText: string;
  icon?: React.ReactNode;
  height?: number;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorText,
  icon,
  height = 50,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // For error message animation
  useEffect(() => {
    if (errorText) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [errorText, fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.errorContainer,
        { opacity: fadeAnim, height: height }, // Set height based on props , // Animate opacity when error is present
      ]}
    >
      {/* <Ionicons name="close-circle-outline" size={30} color="#cc0000" /> */}
      {icon}
      <Text style={styles.errorMessage}>{errorText}</Text>
    </Animated.View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorContainer: {
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
