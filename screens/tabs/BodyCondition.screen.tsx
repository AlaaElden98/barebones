import { View, Text } from "react-native";

import type { BodyConditionScreenProps } from "@/navigation/types";

export const BodyCondition: React.FC<BodyConditionScreenProps> = ({
  route,
}) => {
  const { petId } = route.params;
  return (
    <View>
      <Text>Body Condition</Text>
    </View>
  );
};
