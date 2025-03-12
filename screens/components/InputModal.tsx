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

type InputModalProps = {
  type: "bodyCondition" | "weightLog" | "vetVisit";
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
    if (type === "weightLog") {
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
        onPress={handleClose}
      >
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.input}
            placeholder={type === "weightLog" ? "Weight by KG" : undefined}
            value={input}
            onChangeText={setInput}
            keyboardType={type === "weightLog" ? "numeric" : "default"}
            multiline={type === "vetVisit"}
            maxLength={type !== "vetVisit" ? 50 : undefined}
            autoFocus
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Submit</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
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
  },
});
