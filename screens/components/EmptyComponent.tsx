import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors } from "@/utils/colors";

export const EmptyComponent = ({
  loading,
  error,
}: {
  loading: boolean;
  error: string | null;
}) => (
  <View style={styles.emptyContainer}>
    {loading ? <ActivityIndicator size="large" color={colors.blue} /> : null}
    {!loading && error ? <Text style={styles.errorText}>{error}</Text> : null}
    {!loading && !error ? (
      <Text style={styles.emptyText}>No Data Found!</Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
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
