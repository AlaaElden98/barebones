import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HeaderLeft } from "./components/HeaderLeft";
import { BodyCondition, VetVisits, WeightLogs } from "@/screens";
import type { BottomTabNavigatorProps, BottomTabParamList } from "./types";

const TabBar = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = ({ petId, navigation }: BottomTabNavigatorProps) => {
  return (
    <TabBar.Navigator
      initialRouteName="WeightLogs"
      screenOptions={{
        tabBarShowLabel: false,
        headerLeft: () => <HeaderLeft navigation={navigation} />,
      }}
    >
      <TabBar.Screen
        name="WeightLogs"
        initialParams={{ petId }}
        component={WeightLogs}
        options={{
          tabBarIcon(props) {
            return (
              <FontAwesome6
                name="weight-scale"
                size={props.size}
                color={props.color}
              />
            );
          },
          headerTitle: "Weight Logs",
        }}
      />
      <TabBar.Screen
        name="BodyCondition"
        initialParams={{ petId }}
        component={BodyCondition}
        options={{
          tabBarIcon(props) {
            return (
              <FontAwesome
                name="heartbeat"
                size={props.size}
                color={props.color}
              />
            );
          },
          headerTitle: "Body Condition",
        }}
      />
      <TabBar.Screen
        name="VetVisits"
        initialParams={{ petId }}
        component={VetVisits}
        options={{
          tabBarIcon(props) {
            return (
              <FontAwesome6
                name="user-doctor"
                size={props.size}
                color={props.color}
              />
            );
          },
          headerTitle: "Vet Visits",
        }}
      />
    </TabBar.Navigator>
  );
};

export default BottomTabNavigator;
