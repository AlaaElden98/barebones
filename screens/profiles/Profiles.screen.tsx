import type React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { usePets } from "@/hooks";
import type { ProfilesScreenProps } from "@/navigation/types";

export const ProfilesScreen: React.FC<ProfilesScreenProps> = ({
  navigation,
}) => {
  const { pets, loading, error } = usePets();
  return (
    <View style={styles.container}>
      <Text>Profiles</Text>
      <Text>{JSON.stringify(pets)}</Text>
      <Text>isLoading: {loading.toString()}</Text>
      <Text>error: {error}</Text>
      <Button
        title="Add Profile"
        onPress={() => navigation.navigate("AddProfile")}
      />
      <Button
        title="Go to Body Condition"
        onPress={() =>
          navigation.navigate("TabBar", {
            petId: "3f4a9bde-8c2b-4f9e-ae3d-6d7f9b8c5e1a",
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});
