import { IconSymbol } from "@/components/ui/icon-symbol";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const hasTasks = useMemo(() => tasks.length > 0, [tasks]);

  const addTask = () => {
    if (!newTitle.trim()) return;
    const newTask: TaskItem = {
      id: `${Date.now()}`,
      title: newTitle.trim(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setNewTitle("");
    setIsModalVisible(false);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const renderItem = ({ item }: { item: TaskItem }) => (
    <View style={styles.taskRow}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxOn]}
        onPress={() => toggleTask(item.id)}
      >
        {item.completed && (
          <IconSymbol name="checkmark" color="#ffffff" size={14} />
        )}
      </TouchableOpacity>
      <Text style={[styles.taskTitle, item.completed && styles.taskTitleDone]}>
        {item.title}
      </Text>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteTask(item.id)}
      >
        <IconSymbol name="trash" color="#dc3545" size={18} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {!hasTasks ? (
        <View style={styles.emptyContainer}>
          <TouchableOpacity
            style={styles.addPrimary}
            onPress={() => setIsModalVisible(true)}
          >
            <IconSymbol name="plus" color="#ffffff" size={18} />
            <Text style={styles.addPrimaryText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <TouchableOpacity
            style={styles.fab}
            onPress={() => setIsModalVisible(true)}
            accessibilityLabel="Add Task"
          >
            <IconSymbol name="plus" color="#ffffff" size={22} />
          </TouchableOpacity>
        </>
      )}

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setIsModalVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Task title"
              value={newTitle}
              onChangeText={setNewTitle}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={addTask}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => {
                  setNewTitle("");
                  setIsModalVisible(false);
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={addTask}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  addPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007aff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  addPrimaryText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  listContent: {
    padding: 16,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#e9ecef",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "#ffffff",
  },
  checkboxOn: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    color: "#212529",
  },
  taskTitleDone: {
    color: "#6c757d",
    textDecorationLine: "line-through",
  },
  deleteBtn: {
    padding: 6,
    marginLeft: 8,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007aff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#212529",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginLeft: 8,
  },
  cancelBtn: {
    backgroundColor: "#f1f3f5",
  },
  saveBtn: {
    backgroundColor: "#007aff",
  },
  cancelText: {
    color: "#343a40",
    fontWeight: "600",
  },
  saveText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
