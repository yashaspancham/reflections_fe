import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme, Text, FAB } from "react-native-paper";
import EntriesComponent from "@/components/Entries";

export default function HomeScreen() {
  const theme = useTheme();
  const router=useRouter();
  return (
    <View style={{ flex: 1, padding: 12, paddingTop: 80 }}>
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
