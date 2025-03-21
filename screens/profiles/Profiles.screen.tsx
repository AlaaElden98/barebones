import type React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { usePets } from "@/hooks";
import { PetCard } from "./components";
import { colors } from "@/utils/colors";
import { EmptyComponent } from "../components";
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

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        renderItem={({ item }) => (
          <PetCard pet={item} onPress={handleOnPressProfile} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={<EmptyComponent loading={loading} error={error} />}
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
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  addProfileButton: {
    padding: 16,
    marginBottom: 34,
    alignSelf: "center",
  },
  addProfileButtonText: {
    fontSize: 16,
    color: colors.dodgerBlue,
  },
});
