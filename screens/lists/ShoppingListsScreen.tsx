import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import ErrorMessage from "@/lib/components/ErrorMessage";
import { Ionicons } from "@expo/vector-icons";
import LinkButton from "@/lib/components/LinkButton";

const client = generateClient<Schema>({
  authMode: "userPool",
});

type ShoppingList = Schema["ShoppingList"];

const ShoppingListsScreen = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const fetchShoppingLists = async () => {
    try {
      const { data } = await client.models.ShoppingList.list();

      if (data) setLists(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load shopping lists.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchShoppingLists();
    setRefreshing(false);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <ErrorMessage
        icon={
          <Ionicons name="close-circle-outline" size={30} color="#cc0000" />
        }
        errorText={error}
      />
    );
  }

  if (lists.length === 0) {
    return <Text style={styles.infoText}>No shopping lists found.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <LinkButton style={styles.listItemContainer} id={item.id}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              style={styles.chevronIcon}
            />
          </LinkButton>
        )}
      />
    </View>
  );
};

export default ShoppingListsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7", // A neutral, light background
    padding: 16, // Horizontal padding
  },
  listItemContainer: {
    backgroundColor: "#ffffff", // White background for each list item
    paddingVertical: 15, // Vertical padding for the container
    paddingHorizontal: 20, // Horizontal padding for the container
    borderRadius: 10, // Rounded corners for the container
    flexDirection: "row", // Layout children in a row
    alignItems: "center", // Center items vertically
    justifyContent: "space-between", // Space between the text and the chevron icon
    marginBottom: 10, // Margin at the bottom of each item
    elevation: 3, // Elevation for Android for a shadow effect
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 1 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 3, // Shadow radius for iOS
  },

  itemText: {
    fontSize: 16, // Font size for the item text
    color: "#333", // Color for the item text
    flex: 1, // Allows text to fill the space and wrap if needed
  },
  infoText: {
    color: "#5bc0de", // A pleasant blue for info
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  chevronIcon: {
    color: "#e91e63", // You can choose a color that matches your app's theme
    paddingRight: 10, // Add some padding to align the icon properly
  },
});
