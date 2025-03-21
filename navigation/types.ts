import type { Session } from "@supabase/supabase-js";
import type { RouteProp } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MainStackParamList = {
  Profiles: undefined;
  AddProfile: undefined;
  Auth: undefined;
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
> & {
  session: Session;
};
export type AddProfileScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "AddProfile"
> & {
  session: Session;
};
export type AuthScreenProps = NativeStackScreenProps<MainStackParamList, "Auth">;
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

export type BottomTabNavigatorProps = {
  petId: string;
  navigation: NativeStackNavigationProp<MainStackParamList>;
};
