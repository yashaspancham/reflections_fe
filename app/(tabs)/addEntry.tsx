import { ScrollView, View, Keyboard } from "react-native";
import { useTheme, Text, TextInput, Button } from "react-native-paper";
import { formatFullDate } from "@/utiles/date";
import { useRef, useState, useCallback } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { saveToStorage } from "@/utiles/localStore";
import Toast from "react-native-toast-message";
import { entryT } from "@/utiles/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { findEntryBasedOnDatetime } from "@/utiles/others";

const AddEntryPage = () => {
  const theme = useTheme();
  const [titleText, setTitleText] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");
  const [datetimePram, setDatetimePram] = useState<Date | undefined>(undefined);
  const [entry, setEntry] = useState<entryT | undefined>(undefined);
  const titleTextInputRef = useRef<any | null>(null);
  const { datetime } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      setContentText("");
      setTitleText("");
      setEntry(undefined);
      const timeout = setTimeout(() => {
        titleTextInputRef.current?.focus();
      }, 100);
  
      if (typeof datetime === "string") {
        const parsedDate = new Date(datetime);
        setDatetimePram(parsedDate);
        AsyncStorage.getItem("entries#1234").then((res) => {
          if (res !== null) {
            const parsedEntries: entryT[] = JSON.parse(res);
            const foundEntry = findEntryBasedOnDatetime(parsedDate, parsedEntries);
            if (foundEntry) {
              setEntry(foundEntry);
              setTitleText(foundEntry.entryTitle);      // prefill title
              setContentText(foundEntry.entryContent);  // prefill content
            }
          }
        });
      } else {
        setDatetimePram(undefined);
      }
  
      return () => clearTimeout(timeout);
    }, [datetime])
  );

  const handleSaveButtonClick = async () => {
    if (titleText === "" || contentText === "") {
      Toast.show({
        type: "error",
        text1: "Please tell us More",
        text2: "Your need to write both.",
      });
      return;
    }
    const entry: entryT = {
      datetime: new Date(),
      entryTitle: titleText,
      entryContent: contentText,
    };
    saveToStorage(entry).then((res) => {
      if (res) {
        setTitleText("");
        setContentText("");
        router.push("/success");
      } else {
        Toast.show({
          type: "error",
          text1: "Unable to Save",
          text2: "Unknown Error in Saving",
        });
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Toast />
      <View
        style={{
          padding: 30,
          flex: 1,
          flexDirection: "column",
          gap: 40,
          zIndex: -1,
        }}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 6,
            alignItems: "center",
            backgroundColor: theme.colors.tertiaryContainer,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
            padding: 10,
            marginTop: 20,
          }}
        >
          <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
            Penned on{" "}
            {formatFullDate(
              datetimePram === undefined ? new Date() : datetimePram
            )}
          </Text>
        </View>

        <View>
          <Text
            variant="titleLarge"
            style={{ color: theme.colors.primary, marginBottom: 20 }}
          >
            Title
          </Text>
          <TextInput
            ref={titleTextInputRef}
            placeholder={"Give your entry a title"}
            value={entry===undefined?titleText:entry.entryTitle}
            onChangeText={(text) => setTitleText(text)}
            mode="outlined"
            multiline={false}
            maxLength={100}
            editable={entry === undefined ? true : false}
          />
        </View>
        <View>
          <Text
            variant="titleLarge"
            style={{ color: theme.colors.primary, marginBottom: 20 }}
          >
            Content
          </Text>
          <TextInput
            placeholder={"Write your thoughts here..."}
            value={entry === undefined ? contentText:entry.entryContent}
            onChangeText={(text) => setContentText(text)}
            mode="outlined"
            multiline={true}
            dense={true}
            style={{ minHeight: 50, height: 300 }}
            onSubmitEditing={() => Keyboard.dismiss()}
            maxLength={1000}
            editable={entry === undefined ? true : false}
          />
        </View>

        {entry === undefined && (
          <View
            style={{
              flex: 1,
              flexDirection: "row-reverse",
              gap: 20,
              maxHeight: 50,
              marginTop: 30,
            }}
          >
            <Button
              mode="contained"
              onPress={() => handleSaveButtonClick()}
              contentStyle={{ height: 50, width: 100 }}
              labelStyle={{ fontSize: 16 }}
            >
              Save
            </Button>
            <Button
              mode="outlined"
              onPress={() => router.push("/")}
              contentStyle={{ height: 50, width: 100 }}
              labelStyle={{ fontSize: 16 }}
            >
              Cancel
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AddEntryPage;
