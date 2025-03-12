import type { RouteProp } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MainStackParamList = {
  Profiles: undefined;
  TabBar: { petId: string };
};

export type BottomTabParamList = {
  BodyCondition: { petId: string };
  WeightLogs: { petId: string };
  VetVisits: { petId: string };
};

export type ProfilesScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "Profiles"
>;
export type TabBarScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "TabBar"
>;

export type BodyConditionScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "BodyCondition"
>;
export type WeightLogsScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "WeightLogs"
>;
export type VetVisitsScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "VetVisits"
>;

export type TabBarRouteProp = RouteProp<MainStackParamList, "TabBar">;
export type BottomTabRouteProp = RouteProp<
  BottomTabParamList,
  keyof BottomTabParamList
>;

export type BottomTabNavigatorProps = {
  petId: string;
  navigation: NativeStackNavigationProp<MainStackParamList>;
};
