import { View, Text } from "react-native";

import type { WeightLogsScreenProps } from "@/navigation/types";

export const WeightLogs: React.FC<WeightLogsScreenProps> = ({ route }) => {
  const { petId } = route.params;
  return (
    <View>
      <Text>Weight Logs</Text>
    </View>
  );
};
