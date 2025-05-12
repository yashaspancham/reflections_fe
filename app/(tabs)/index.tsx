import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme, Text, FAB } from "react-native-paper";
import EntriesComponent from "@/components/Entries";
import { useEffect } from "react";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {//this has to be removed
    setTimeout(()=>{
      router.push("/login");
    },100)
  }, []);
  return (
    <View
      style={{
        flex: 1,
        padding: 12,
        paddingTop: 80,
        backgroundColor: "#f6f6f6",
      }}
    >
      <Text
        variant="headlineLarge"
        style={{
          color: theme.colors.primary,
          borderBottomWidth: 2,
          paddingBottom: 10,
          borderBottomColor: theme.colors.secondary,
        }}
      >
        All Entries
      </Text>
      <EntriesComponent />
      <FAB
        variant="primary"
        icon="plus"
        onPress={() => router.push("/addEntry")}
        style={{ position: "absolute", bottom: 30, right: 30 }}
      />
    </View>
  );
}
