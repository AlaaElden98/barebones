import React, { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";

import { supabase } from "@/utils/supbase";
import type { MainStackParamList } from "./types";
import BottomTabNavigator from "./BottomTabNavigator";
import { ProfilesScreen, AddProfile, Auth } from "@/screens";

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
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
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
      {session?.user ? (
        <>
          <Stack.Screen
            name="Profiles"
            options={{
              headerTitle: "Pets",
              headerBackVisible: false,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => supabase.auth.signOut()}
                  style={{ marginRight: 20 }}
                >
                  <Text>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          >
            {(props) => <ProfilesScreen {...props} session={session} />}
          </Stack.Screen>
          <Stack.Screen
            name="AddProfile"
            options={{ headerTitle: "Add New Pet" }}
          >
            {(props) => <AddProfile {...props} session={session} />}
          </Stack.Screen>
          <Stack.Screen
            name="TabBar"
            options={{
              headerShown: false,
            }}
          >
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
