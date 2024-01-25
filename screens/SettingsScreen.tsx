import { View, Text } from "react-native";
import React from "react";
import { StyledButton } from "@ariveroi/react-native-ui";
import { signOut } from "aws-amplify/auth";

const SettingsScreen = () => {
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <StyledButton text="Sing Out" onClick={signOut} />
    </View>
  );
};

export default SettingsScreen;
