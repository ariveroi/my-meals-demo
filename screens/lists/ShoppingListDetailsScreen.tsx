import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

import { generateClient } from "aws-amplify/api";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>({
  authMode: "userPool",
});

const ShoppingListDetailsScreen = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [ingredients, setIngredients] = useState<any>([]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await client.models.Ingredient.list({
          filter: { shoppingListIngredientsId: { eq: id } },
        });
        setIngredients([...data]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, []);
  return (
    <View style={styles.listContainer}>
      {ingredients.length === 0 ? (
        <Text>No ingredients found</Text>
      ) : (
        <FlatList
          data={ingredients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{item.content}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ShoppingListDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Background color of the entire view
  },
  listContainer: {
    paddingHorizontal: 16, // Padding on the sides of the list
  },
  listItem: {
    backgroundColor: "#ffffff", // White background for each list item
    paddingVertical: 20, // Padding on top and bottom of each list item
    paddingHorizontal: 16, // Padding on the sides of each list item
    borderRadius: 10, // Rounded corners for the list items
    marginVertical: 8, // Margin on top and bottom for each list item
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    elevation: 3, // Elevation for Android for a shadow effect
    flexDirection: "row", // Allows for additional elements side-by-side
    alignItems: "center", // Centers items vertically within the row
  },
  listItemText: {
    fontSize: 18, // Font size for the list item text
    color: "#333", // Text color
    flex: 1, // Takes up all available space
  },
  // If you need additional styling for other elements, add them here
});
