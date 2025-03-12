import { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

export const Card = ({ title, date }: { title: string; date: string }) => {
  // Format the date to ex:"Wednesday, March 12, 2025"
  const formattedDateString = useMemo(() => {
    try {
      const formattedDate = new Date(date);
      return formattedDate.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return date;
    }
  }, [date]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{formattedDateString}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#e6f3ff",
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
});
