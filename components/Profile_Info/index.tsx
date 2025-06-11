import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Text,
  ActivityIndicator,
  IconButton,
  useTheme,
  TextInput,
} from "react-native-paper";
import { RootState } from "@/utiles/redux/store";
import { useSelector } from "react-redux";
import { getUserName, putUserName } from "@/utiles/apis/users/users";
import Toast from "react-native-toast-message";

const ProfileInfo = () => {
  const [username, setUsername] = React.useState<string | null>(null);
  const [loadingUsername, setLoadingUsername] = React.useState<boolean>(true);
  const [editUsername, setEditUsername] = React.useState<boolean>(false);
  const [disableTextInput, setDisableTextInput] =
    React.useState<boolean>(false);
  const [newUsername, setNewUsername] = React.useState<string>("");
  const user_email = useSelector((state: RootState) => state.auth.user_email);
  const user_id = useSelector((state: RootState) => state.auth.user_id);
  const theme = useTheme();
  useEffect(() => {
    if (user_id !== null && user_id !== undefined) {
      getUserName(user_id).then((res: any) => {
        if (res.success) {
          setUsername(res.data.username);
          setLoadingUsername(false);
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: res.message || "Failed to fetch user data.",
          });
        }
      });
    }
  }, []);
  const changename = () => {
    setDisableTextInput(true);
    if (user_id !== null && user_id !== undefined) {
      putUserName(user_id, newUsername).then((res: any) => {
        if (res.success) {
          setUsername(res.data);
          setEditUsername(false);
          setDisableTextInput(false);
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: res.message || "Failed to update username.",
          });
        }
      });
    }
  };

  return (
    <>
      <Image
        source={require("../../assets/images/defaultProfilePic.png")}
        style={styles.avatar}
      />
      <View>
        {loadingUsername ? (
          <ActivityIndicator animating={true} />
        ) : editUsername ? (
          <TextInput
            disabled={disableTextInput}
            autoFocus={true}
            multiline={false}
            numberOfLines={1}
            dense={true}
            maxLength={10}
            value={newUsername}
            onChangeText={(text) => setNewUsername(text)}
            style={{ width: 150, textAlign: "center", marginBottom: 15 }}
            right={
              <TextInput.Icon
                icon="check"
                color="#8fab73"
                onPress={() => changename()}
              />
            }
          />
        ) : (
          <View style={styles.usernameContainer}>
            <Text style={styles.name}>{username}</Text>
            <IconButton
              onPress={() => setEditUsername(true)}
              icon="pen"
              iconColor={theme.colors.primary}
              style={{ marginBottom: 10 }}
              size={20}
            />
          </View>
        )}
      </View>
      <Text style={styles.email}>{user_email}</Text>
    </>
  );
};
export default ProfileInfo;

const styles = StyleSheet.create({
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    backgroundColor: "#ddd",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft: 40,
  },
  email: {
    fontSize: 16,
    color: "#888",
    marginBottom: 24,
  },
});
