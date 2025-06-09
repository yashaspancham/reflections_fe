import { Image, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme, Text, FAB } from "react-native-paper";
import EntriesComponent from "@/components/Entries";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        padding: 12,
        paddingTop: 80,
        backgroundColor: "#f6f6f6",
      }}
    >
      <Toast />
      <View
        style={{
          borderBottomColor: theme.colors.secondary,
          borderBottomWidth: 2,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          variant="headlineLarge"
          style={{
            color: theme.colors.primary,
          }}
        >
          All Entries
        </Text>
        <Pressable onPress={()=>router.push("/(tabs)/profile")}>
          <Image
            source={require("../../assets/images/defaultProfilePic.png")}
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
        </Pressable>
      </View>
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
