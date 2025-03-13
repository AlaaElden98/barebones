import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import type { LogType } from "@/types";
import { colors } from "@/utils/colors";

type InputModalProps = {
  type: LogType;
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: string) => void;
};

export const InputModal = ({
  type,
  visible,
  onClose,
  onSubmit,
}: InputModalProps) => {
  const [input, setInput] = useState<string>("");

  const handleClose = () => {
    setInput("");
    onClose();
  };

  const isNumeric = (value: string): boolean => {
    return !Number.isNaN(Number(value)) && value.trim() !== "";
  };

  const handleSubmit = () => {
    if (!input) {
      Alert.alert("Invalid input", "Input cannot be empty");
      return;
    }
    if (type === "weight") {
      if (isNumeric(input)) {
        onSubmit(input);
        setInput("");
      } else {
        Alert.alert("Invalid input", "Please enter a valid number");
      }
    } else {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={handleClose}
      animationType="slide"
      statusBarTranslucent
      transparent
    >
      <TouchableOpacity
        style={[StyleSheet.absoluteFill, styles.container]}
        disabled
      >
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <FontAwesome name="close" size={18} color="#ccc" />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, type === "vet" && { minHeight: 100 }]}
            placeholder={type === "weight" ? "Weight by KG" : undefined}
            value={input}
            onChangeText={setInput}
            keyboardType={type === "weight" ? "numeric" : "default"}
            multiline={type === "vet"}
            // limit other types to be single word/phrase
            maxLength={type !== "vet" ? 50 : undefined}
            autoFocus
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={{ padding: 10 }}
            hitSlop={20}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 16,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    borderRadius: 16,
    marginBottom: "30%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: "100%",
    maxHeight: 120,
    marginTop: 24,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.dodgerBlue,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
  },
});
