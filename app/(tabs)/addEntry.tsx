import { ScrollView, View, Keyboard } from "react-native";
import { useTheme, Text, TextInput, Button } from "react-native-paper";
import { formatFullDate } from "@/utiles/date";
import { useRef, useState, useCallback, useEffect } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { apiReturnErrorT, entryT, oldEntryT } from "@/utiles/types";
import { addEntry, getEntryById } from "@/utiles/apis/entries/entries";
import { useSelector } from "react-redux";
import { RootState } from "@/utiles/redux/store";

const AddEntryPage = () => {
  const theme = useTheme();
  const [titleText, setTitleText] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");
  const [entry, setEntry] = useState<oldEntryT | undefined>(undefined);
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);
  const titleTextInputRef = useRef<any | null>(null);
  const { entry_id } = useLocalSearchParams();
  const router = useRouter();
  const user_id = useSelector((state: RootState) => state.auth.user_id);

  useEffect(() => {
    if (!entry_id) {
      setEntry(undefined);
      setTitleText("");
      setContentText("");
      return;
    }
    getEntryById(Number(entry_id)).then((res) => {
      if (res!==null) {
        setEntry(res);
      }
    });
  }, [entry_id]);

  const handleSaveButtonClick = async () => {
    if (titleText === "" || contentText === "") {
      Toast.show({
        type: "error",
        text1: "Please tell us More",
        text2: "You need to write both.",
      });
      setDisableSaveButton(false);
      return;
    }
    await addEntry(user_id, titleText, contentText).then(
      (res: boolean | apiReturnErrorT) => {
        if (res===true) {
          setEntry(undefined);
          setTitleText("");
          setContentText("");
          router.push("/(tabs)/success");
        } else {
          Toast.show({
            type: "error",
            text1: res.message,
          });
        }
        setDisableSaveButton(false);
      }
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#f6f6f6",
        flex: 1,
        minHeight: 820,
      }}
    >
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
            maxHeight: 50,
            justifyContent: "center",
          }}
        >
          <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
            Penned on{" "}
            {formatFullDate(entry === undefined ? new Date() : entry.datetime)}
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
            value={entry === undefined ? titleText : entry.entryTitle}
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
            value={entry === undefined ? contentText : entry.entryContent}
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
              onPress={() => {
                setDisableSaveButton(true);
                handleSaveButtonClick();
              }}
              contentStyle={{ height: 50, width: 100 }}
              labelStyle={{ fontSize: 16 }}
              disabled={disableSaveButton}
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
