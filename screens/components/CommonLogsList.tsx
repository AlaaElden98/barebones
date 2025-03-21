import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  type FlatListProps,
} from "react-native";
import { useState, useEffect } from "react";

import type {
  LogType,
  WeightLog,
  VetVisitLog,
  BodyConditionLog,
} from "@/types";
import { Card, EmptyComponent, InputModal } from ".";
import { colors } from "@/utils/colors";

type CommonLogsListProps<T extends WeightLog | BodyConditionLog | VetVisitLog> =
  {
    type: LogType;
    logs: T[];
    loading: boolean;
    error: string | null;
    adding: boolean;
    addError: string | null;
    handleOnSubmit: (data: string) => void;
  } & Omit<FlatListProps<T>, "data" | "renderItem">; // Allow extra FlatList props

export const CommonLogsList = <
  T extends WeightLog | BodyConditionLog | VetVisitLog
>({
  logs,
  loading,
  error,
  adding,
  addError,
  handleOnSubmit,
  type,
  ...flatListProps // Allow dynamic FlatList properties
}: CommonLogsListProps<T>) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressAddLog = () => {
    setIsModalVisible(true);
  };

  const onSubmit = (data: string) => {
    handleOnSubmit(data);
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (addError) {
      Alert.alert(`Error adding ${type} log`, addError);
    }
  }, [addError, type]);

  return (
    <View style={styles.container}>
      <InputModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={onSubmit}
        type={type}
      />
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={<EmptyComponent loading={loading} error={error} />}
        renderItem={({ item }) => {
          switch (type) {
            case "weight":
              return (
                <Card
                  title={`${(item as WeightLog).weight} KG`}
                  date={(item as WeightLog).date}
                />
              );
            case "body":
              return (
                <Card
                  title={(item as BodyConditionLog).body_condition}
                  date={(item as BodyConditionLog).date}
                />
              );
            case "vet":
              return (
                <Card
                  title={(item as VetVisitLog).notes}
                  date={(item as VetVisitLog).date}
                />
              );
            default:
              return null;
          }
        }}
        {...flatListProps} // Supports additional FlatList props
      />
      <TouchableOpacity
        style={styles.addProfileButton}
        disabled={adding}
        onPress={onPressAddLog}
        activeOpacity={0.7}
      >
        {adding ? (
          <ActivityIndicator size="small" color={colors.blue} />
        ) : (
          <Text style={styles.addProfileButtonText}>Add new {type} log</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  addProfileButton: {
    padding: 16,
    alignSelf: "center",
    backgroundColor: "white",
  },
  addProfileButtonText: {
    fontSize: 16,
    color: colors.dodgerBlue,
  },
});
