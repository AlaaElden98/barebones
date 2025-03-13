// Example from https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=async-storage#set-up-a-login-component
import {
  View,
  Text,
  Alert,
  AppState,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

import { colors } from "@/utils/colors";
import { supabase } from "@/utils/supbase";
import type { AuthScreenProps } from "@/navigation/types";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export const Auth: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    if (!checkFormValidation()) {
      Alert.alert("Please enter a valid email and password");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (!checkFormValidation()) {
      Alert.alert("Please enter a valid email and password");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }
    if (!data.session) {
      Alert.alert("Please check your inbox for email verification!");
      setLoading(false);
    }
  }

  const checkFormValidation = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && password.length >= 6;
  };

  const renderButton = (text: string, onPress: () => void) => {
    return (
      <TouchableOpacity
        disabled={loading}
        onPress={onPress}
        hitSlop={20}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      {renderButton("Sign in", signInWithEmail)}
      <View style={{ height: 10 }} />
      {renderButton("Sign up", signUpWithEmail)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    marginTop: 200,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    paddingVertical: 20,
    width: 120,
    backgroundColor: "transparent",
  },
  buttonText: {
    color: colors.dodgerBlue,
    fontSize: 18,
  },
});
