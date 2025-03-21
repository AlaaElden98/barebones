import { TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { MainStackParamList } from "../types";

export const HeaderLeft = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<MainStackParamList>;
}) => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={{ marginLeft: 16 }}
  >
    <FontAwesome6 name="arrow-left" size={24} color="rgb(0, 122, 255)" />
  </TouchableOpacity>
);
