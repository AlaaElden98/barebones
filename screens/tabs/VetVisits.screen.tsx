import { View, Text } from "react-native";

import type { VetVisitsScreenProps } from "@/navigation/types";

export const VetVisits: React.FC<VetVisitsScreenProps> = ({ route }) => {
  const { petId } = route.params;
  return (
    <View>
      <Text>Vet Visits</Text>
    </View>
  );
};
