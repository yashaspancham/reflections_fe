import { ScrollView, View, Pressable } from "react-native";
import { Text, useTheme, ActivityIndicator } from "react-native-paper";
import { dayAndMonth, getTimeWithAmPm } from "@/utiles/date";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useState } from "react";
import { entryT } from "@/utiles/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const EntriesComponent = () => {
  const [dataPresent, setDataPresent] = useState<number>(0);
  const [entries, setEntries] = useState<entryT[] | null>(null);
  const theme = useTheme();
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        // await AsyncStorage.removeItem('entries#1234');
        const entriesJSON = await AsyncStorage.getItem("entries#1234");
        if (entriesJSON === null) {
          setDataPresent(2);
        } else {
          const parsed = JSON.parse(entriesJSON);
          setEntries(parsed);
          setDataPresent(1);
        }
      };
      loadData();
    }, [])
  );
  return (
    <ScrollView style={{ paddingHorizontal: 0 }}>
      {dataPresent === 0 && (
        <ActivityIndicator
          size="large"
          animating={true}
          style={{ paddingTop: 100 }}
        />
      )}
      {entries?.map((item, index) => (
        <Pressable key={index} onPress={() => router.push(
          { pathname: "/addEntry", params: { datetime: item.datetime.toString() } }
        )}>
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
      ))}
      {entries?.length === 0 && (
        <Text variant="headlineLarge" style={{ paddingTop: 50 }}>
          There are no entries
        </Text>
      )}
    </ScrollView>
  );
};

export default EntriesComponent;
