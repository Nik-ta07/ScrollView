import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createTodo, fetchTodos, Todo } from "../services/todos";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onCreate = useCallback(async () => {
    setCreating(true);
    try {
      const newItem = await createTodo({ title: "New Todo", description: "Created from app" });
      setTodos((prev) => [newItem, ...prev]);
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to create todo");
    } finally {
      setCreating(false);
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
        <Text style={styles.loadingText}>Loading todos…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.title}>Todos</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button title="Refresh" onPress={load} />
          <Button title={creating ? "Adding…" : "Add"} onPress={onCreate} disabled={creating} />
        </View>
      </View>

      {todos.map((todo) => (
        <View key={todo.id} style={styles.productContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{todo.title}</Text>
            {!!todo.description && <Text style={styles.shipping}>{todo.description}</Text>}
            <Text style={styles.price}>{todo.completed ? "Completed" : "Pending"} • {todo.priority}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    color: "#555",
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    color: "#007aff",
    fontSize: 14,
  },
  shipping: {
    fontSize: 12,
    color: "#555",
  },
});
