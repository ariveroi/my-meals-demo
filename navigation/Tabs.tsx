import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/HomeScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import ShoppingListsScreen from "@/screens/lists/ShoppingListsScreen";
import ShoppingLists from "./ShoppingLists";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ShoppingLists"
        component={ShoppingLists}
        options={{
          headerShown: false,
          tabBarLabel: "Shopping Lists",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
