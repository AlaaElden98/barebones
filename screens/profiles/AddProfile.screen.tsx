import { useState } from "react";
import {
  View,
  Text,
  Alert,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CommonActions } from "@react-navigation/native";

import { usePets } from "@/hooks";
import type { Pet } from "@/types";
import type { AddProfileScreenProps } from "@/navigation/types";

export const AddProfile: React.FC<AddProfileScreenProps> = ({
  navigation,
  session,
}) => {
  const { addNewPet, adding, addError } = usePets(session.user.id);

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async () => {
    if (!name || !species || !age) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newPet: Omit<Pet, "id" | "created_at" | "owner_id"> = {
      name,
      species,
      breed: breed || undefined,
      age: Number.parseInt(age, 10),
    };

    try {
      await addNewPet(newPet);
      Alert.alert("Success", "Pet added successfully!", [
        {
          text: "OK",
          onPress: () => {
            resetForm();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Profiles" }],
              })
            );
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to add pet.");
    }
  };

  const resetForm = () => {
    setName("");
    setSpecies("");
    setBreed("");
    setAge("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Species (Dog, Cat, etc.)"
        value={species}
        onChangeText={setSpecies}
      />

      <TextInput
        style={styles.input}
        placeholder="Breed (Optional)"
        value={breed}
        onChangeText={setBreed}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      {adding ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Add Pet" onPress={handleSubmit} />
      )}

      {addError && <Text style={styles.errorText}>{addError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
