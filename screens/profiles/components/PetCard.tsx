import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import type { Pet } from "@/types";

export const PetCard = ({
  pet,
  onPress,
}: {
  pet: Pet;
  onPress: (petId: string) => void;
}) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(pet.id)}>
    <Text style={styles.name}>{pet.name}</Text>
    <Text>Species: {pet.species}</Text>
    <Text>Age: {pet.age} years</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
