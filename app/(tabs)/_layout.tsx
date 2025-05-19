import { useFocusEffect, Tabs, useRouter } from "expo-router";
import React, {useCallback}  from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSelector } from "react-redux";
import { RootState } from "@/utiles/redux/store";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const router=useRouter();
  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn) {
        router.replace("/login");
      }
    }, [isLoggedIn])
  );
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="addEntry"
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="success"
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
