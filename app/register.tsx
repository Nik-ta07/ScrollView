import { IconSymbol } from "@/components/ui/icon-symbol";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setLoading(true);
      if (!email || !name || !password) {
        Alert.alert("Error", "Please fill all fields.");
        setLoading(false);
        return;
      }
      const { register } = await import("../services/auth");
      await register({ email: email.trim(), name: name.trim(), password });
      Alert.alert("Success", "Account created. Please log in.");
      router.replace("/login");
    } catch (e: any) {
      Alert.alert("Registration failed", e?.message ?? "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Register" }} />

      <View style={styles.header}>
        <IconSymbol
          name="person.crop.circle.badge.plus"
          color="#007aff"
          size={60}
        />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Register to continue</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <IconSymbol
            name="person.fill"
            color="#6c757d"
            size={20}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <IconSymbol
            name="envelope.fill"
            color="#6c757d"
            size={20}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <IconSymbol
            name="lock.fill"
            color="#6c757d"
            size={20}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.loginButtonText}>Register</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#212529",
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 5,
  },
  form: {
    width: "100%",
    maxWidth: 350,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#343a40",
  },
  loginButton: {
    backgroundColor: "#007aff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
