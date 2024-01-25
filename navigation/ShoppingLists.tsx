import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShoppingListsScreen from "@/screens/lists/ShoppingListsScreen";
import ShoppingListDetailsScreen from "@/screens/lists/ShoppingListDetailsScreen";

const Stack = createNativeStackNavigator();

const ShoppingLists = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Shopping Lists" component={ShoppingListsScreen} />
      <Stack.Screen
        options={{ headerBackTitle: "Back" }}
        name="Details"
        component={ShoppingListDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default ShoppingLists;
