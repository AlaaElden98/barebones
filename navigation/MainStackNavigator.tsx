import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "@/utils/supbase";
import type { MainStackParamList } from "./types";
import BottomTabNavigator from "./BottomTabNavigator";
import { ProfilesScreen, AddProfile, Auth } from "@/screens";

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    // AsyncStorage.clear();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (session === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {session?.user ? (
        <>
          <Stack.Screen name="Profiles" options={{ headerBackVisible: false }}>
            {(props) => <ProfilesScreen {...props} session={session} />}
          </Stack.Screen>
          <Stack.Screen name="AddProfile">
            {(props) => <AddProfile {...props} session={session} />}
          </Stack.Screen>
          <Stack.Screen name="TabBar" options={{ headerShown: false }}>
            {({ route, navigation }) => (
              <BottomTabNavigator
                navigation={navigation}
                petId={route.params.petId}
              />
            )}
          </Stack.Screen>
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
