import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { StyledButton } from "@/lib";

import Ionicos from "react-native-vector-icons/Ionicons";

import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";

type Ingredient = Schema["Ingredient"];

const client = generateClient<Schema>({
  authMode: "userPool",
});

const Separator = () => <View style={styles.separator} />;

const initialState = {
  content: "",
  id: "",
};

const HomeScreen = () => {
  const [ingredient, setIngredient] = useState(initialState);
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await client.models.Ingredient.list();
      if (data) {
        setIngredients(
          data.filter((item) => item.shoppingListIngredientsId === null)
        );
      }

      // const {data: todos} = await client.models.Todo.list();
      // console.log(todos);
      // if (todos) setTodos(todos as []);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTodos();
    setRefreshing(false);
  }, []);

  const handleAddTodo = async () => {
    const { data } = await client.models.Ingredient.create({
      content: ingredient.content,
    });
    setIngredients([...ingredients!, data]);
    setIngredient(initialState);
  };

  const handleDeleteTodo = async (id: string) => {
    client.models.Ingredient.delete({ id: id });
    setIngredients(ingredients!.filter((ingredient) => ingredient.id !== id));
  };

  const handleSaveShoppingList = async () => {
    setLoading(true);
    try {
      const { data } = await client.models.ShoppingList.create({
        name: new Date().toISOString(),
      });

      for (const ingredient of ingredients!) {
        await client.models.Ingredient.update({
          id: ingredient.id,
          content: ingredient.content,
          shoppingListIngredientsId: data.id,
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {ingredients ? (
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <TextInput
                style={styles.inputStyle}
                value={ingredient.content}
                placeholder="Add your ingredient"
                onChangeText={(text) =>
                  setIngredient({ ...ingredient, content: text })
                }
              />
              <StyledButton text="Add" onClick={handleAddTodo} />
              <Separator />
            </View>
          }
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={ingredients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.todoText}>{item.content}</Text>
              <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
                <Ionicos name="trash" size={20} color="#cccccc" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}

      {ingredients && ingredients.length > 0 && (
        <>
          <Separator />
          <StyledButton
            text="Save Shopping List"
            loading={loading}
            onClick={() => handleSaveShoppingList()}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    width: "80%",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    width: "80%",
    marginBottom: 10,
  },

  listItem: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignSelf: "center", // Align item based on its content
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: "row",
    gap: 10,
  },
  todoText: {
    fontSize: 16,
    color: "#333333",
  },
  addButton: {
    // Example style for an "Add" button
    backgroundColor: "#FA8072", // Changed to a pleasing blue
    padding: 10,
    borderRadius: 5,
  },
});
