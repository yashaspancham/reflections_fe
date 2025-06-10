import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text, useTheme, ActivityIndicator, Button } from "react-native-paper";
import { RootState } from "@/utiles/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "@/utiles/redux/store/slices/authSlice";
import {
  getCurrentStreak,
  getLongestStreak,
  getTotalEntries,
  getUserName,
  putUserName,
} from "@/utiles/apis/users/users";
import Toast from "react-native-toast-message";

const Profile = () => {
  const [username, setUsername] = React.useState<string | null>(null);
  const [loadingUsername, setLoadingUsername] = React.useState<boolean>(true);
  const [totalEntries, setTotalEntries] = React.useState<number | null>(null);
  const [loadingTotalEntries, setLoadingTotalEntries] =
    React.useState<boolean>(true);
  const [longestStreak, setLongestStreak] = React.useState<number | null>(null);
  const [loadingLongestStreak, setLoadingLongestStreak] =
    React.useState<boolean>(true);
  const [currentStreak, setCurrentStreak] = React.useState<number | null>(null);
  const [loadingCurrentStreak, setLoadingCurrentStreak] =
    React.useState<boolean>(true);
  const user_email = useSelector((state: RootState) => state.auth.user_email);
  const user_id = useSelector((state: RootState) => state.auth.user_id);
  const theme = useTheme();
  const dispatch = useDispatch();
  const numberStyle = {
    color: theme.colors.primary,
    fontWeight: "bold" as const,
    fontSize: 16,
  };
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
      getLongestStreak(user_id).then((res: any) => {
        if (res.success) {
          setLongestStreak(res.data);
          setLoadingLongestStreak(false);
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: res.message || "Failed to fetch longest streak.",
          });
        }
      });
      getTotalEntries(user_id).then((res: any) => {
        if (res.success) {
          setTotalEntries(res.data);
          setLoadingTotalEntries(false);
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: res.message || "Failed to fetch total entries.",
          });
        }
      });
      getCurrentStreak(user_id).then((res: any) => {
        if (res.success) {
          setCurrentStreak(res.data);
          setLoadingCurrentStreak(false);
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: res.message || "Failed to fetch current streak.",
          });
        }
      });
    }
  }, []);

  // putUserName(user_id, "kabu").then((res: any) => {
  //   if (res.success) {
  //     setUsername(res.data);
  //   } else {
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: res.message || "Failed to update username.",
  //     });
  //   }
  // });

  return (
    <View style={styles.container}>
      <Toast />
      <Image
        source={require("../../assets/images/defaultProfilePic.png")}
        style={styles.avatar}
      />
      <View>
        {loadingUsername ? (
          <ActivityIndicator animating={true} />
        ) : (
          <Text style={styles.name}>{username}</Text>
        )}
      </View>
      <Text style={styles.email}>{user_email}</Text>
      <View>
        <Text variant="titleLarge">Some Stats</Text>
        <Text>
          Total entries:{" "}
          {loadingTotalEntries ? (
            <ActivityIndicator animating={true} />
          ) : (
            <Text style={numberStyle}>{totalEntries}</Text>
          )}
        </Text>
        <Text>
          Longest streak:{" "}
          {loadingLongestStreak ? (
            <ActivityIndicator animating={true} />
          ) : (
            <Text style={numberStyle}>{longestStreak}</Text>
          )}
        </Text>
        <Text>
          Current streak:{" "}
          {loadingCurrentStreak ? (
            <ActivityIndicator />
          ) : (
            <Text style={numberStyle}>{currentStreak}</Text>
          )}{" "}
        </Text>
      </View>
      <Button
        style={{ backgroundColor: theme.colors.error, marginTop: 20 }}
        mode="contained"
        onPress={() => dispatch(setLogout())}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: "#f6f6f6",
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
  },
  email: {
    fontSize: 16,
    color: "#888",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Profile;
