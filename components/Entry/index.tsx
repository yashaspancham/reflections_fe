import { View, FlatList, Pressable } from "react-native";
import { router } from "expo-router";
import { useTheme, Text } from "react-native-paper";
import { oldEntryT } from "@/utiles/types";
import { dayAndMonth, getTimeWithAmPm } from "@/utiles/date";
type EntryProps = { item: oldEntryT; index: number };
const Entry = ({item,index}:EntryProps) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/addEntry",
          params: { entry_id: item.entry_id },
        })
      }
    >
      <View
        style={{
          borderTopWidth: index !== 0 ? 1 : 0,
          borderTopColor: theme.colors.secondary,
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "row",
            gap: 16,
          }}
        >
          <View
            style={{
              width: 80,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text style={{ paddingTop: 10 }} variant="titleMedium">
              {dayAndMonth(new Date(item.datetime))}
            </Text>
            <Text style={{ marginLeft: 20 }}>
              {new Date(item.datetime).toLocaleString("en-US", {
                weekday: "short",
              })}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              variant="titleLarge"
              numberOfLines={1}
              style={{
                fontWeight: "bold",
                marginBottom: 4,
              }}
            >
              {item.entryTitle}
            </Text>
            <Text
              numberOfLines={4}
              variant="bodyLarge"
              style={{ opacity: 0.8 }}
            >
              {item.entryContent}
            </Text>
            <Text
              variant="bodySmall"
              style={{
                opacity: 0.7,
                marginTop: 4,
              }}
            >
              Penned -{getTimeWithAmPm(new Date(item.datetime))}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Entry;