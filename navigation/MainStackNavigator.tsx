import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfilesScreen, AddProfile } from "@/screens";
import type { MainStackParamList } from "./types";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profiles" component={ProfilesScreen} />
      <Stack.Screen name="AddProfile" component={AddProfile} />
      <Stack.Screen name="TabBar" options={{ headerShown: false }}>
        {({ route, navigation }) => (
          <BottomTabNavigator
            navigation={navigation}
            petId={route.params.petId}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
