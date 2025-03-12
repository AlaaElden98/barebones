import type React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { usePets } from "@/hooks";
import { PetCard } from "./components";
import type { ProfilesScreenProps } from "@/navigation/types";

export const ProfilesScreen: React.FC<ProfilesScreenProps> = ({
  navigation,
  session,
}) => {
  const { pets, loading, error } = usePets(session.user.id);

  const handleOnPressProfile = (petId: string) => {
    navigation.navigate("TabBar", { petId });
  };

  const handleOnPressAddProfile = () => {
    navigation.navigate("AddProfile");
  };

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      {!loading && error ? <Text style={styles.errorText}>{error}</Text> : null}
      {!loading && !error ? (
        <Text style={styles.emptyText}>No profiles found</Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        renderItem={({ item }) => (
          <PetCard pet={item} onPress={handleOnPressProfile} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={<EmptyComponent />}
      />
      <TouchableOpacity
        style={styles.addProfileButton}
        onPress={handleOnPressAddProfile}
        hitSlop={20}
        activeOpacity={0.7}
      >
        <Text style={styles.addProfileButtonText}>Add New Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addProfileButton: {
    padding: 16,
    marginBottom: 34,
    alignSelf: "center",
  },
  addProfileButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  emptyText: {
    fontSize: 16,
    color: "#000",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
