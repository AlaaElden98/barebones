import { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Card, EmptyComponent, InputModal } from "../components";
import type { BodyConditionScreenProps } from "@/navigation/types";
import { useBodyConditionLogs } from "@/hooks/useBodyConditionLogs";

export const BodyCondition: React.FC<BodyConditionScreenProps> = ({
  route,
}) => {
  const { petId } = route.params;
  const { logs, loading, error, adding, addError, addNewLog } =
    useBodyConditionLogs(petId);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressAddBodyCondition = () => {
    setIsModalVisible(true);
  };

  const onSubmit = (data: string) => {
    addNewLog({
      body_condition: data,
      date: new Date().toISOString(),
    });
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (addError) {
      Alert.alert("Error adding body condition", addError);
    }
  }, [addError]);

  return (
    <View style={styles.container}>
      <InputModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={onSubmit}
        type="bodyCondition"
      />
      <FlatList
        data={logs}
        renderItem={({ item }) => {
          return <Card title={item.body_condition} date={item.date} />;
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={<EmptyComponent loading={loading} error={error} />}
      />
      <TouchableOpacity
        style={styles.addProfileButton}
        disabled={adding}
        onPress={onPressAddBodyCondition}
        activeOpacity={0.7}
      >
        {adding ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text style={styles.addProfileButtonText}>
            Add new body conditions
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addProfileButton: {
    padding: 16,
    alignSelf: "center",
    backgroundColor: "white",
  },
  addProfileButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
});
