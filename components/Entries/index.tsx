import { ScrollView, View, Pressable } from "react-native";
import { Text, useTheme, ActivityIndicator } from "react-native-paper";
import { dayAndMonth, getTimeWithAmPm } from "@/utiles/date";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useState } from "react";
import { oldEntryT } from "@/utiles/types";
import { router } from "expo-router";
import { allEntries } from "@/utiles/apis/entries/entries";
import { useSelector } from 'react-redux';
import { RootState } from "@/utiles/redux/store"; 

const EntriesComponent = () => {
  const [dataPresent, setDataPresent] = useState<number>(0);
  const [entries, setEntries] = useState<oldEntryT[] | null>(null);
  const theme = useTheme();
  const user_id = useSelector((state: RootState) => state.auth.user_id);
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        let entries:oldEntryT[] | null;
        if(user_id!=null){
          entries = await allEntries(user_id);
          if(entries?.length===0){
            setDataPresent(2);
          }
          else{
            setEntries(entries);
            setDataPresent(1);
          }
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
        <Pressable
          key={index}
          onPress={() =>
            router.push({
              pathname: "/addEntry",
              params: { entry_id: item.entry_id},
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
      ))}
      {dataPresent === 2 && (
        <View
          style={{
            flex: 1,
            alignItems:"center",
          }}
        >
          <Text variant="headlineLarge" style={{ paddingTop: 100 }}>
            No entries
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default EntriesComponent;
