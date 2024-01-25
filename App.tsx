import { AuthenticatorProvider } from "@/lib";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
Amplify.configure(config);

export default function App() {
  return (
    <AuthenticatorProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AuthenticatorProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
