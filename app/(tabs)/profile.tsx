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
} from "@/utiles/apis/users/users";
import Toast from "react-native-toast-message";
import ProfileInfo from "@/components/Profile_Info";

const Profile = () => {
  const [totalEntries, setTotalEntries] = React.useState<number | null>(null);
  const [loadingTotalEntries, setLoadingTotalEntries] =
    React.useState<boolean>(true);
  const [longestStreak, setLongestStreak] = React.useState<number | null>(null);
  const [loadingLongestStreak, setLoadingLongestStreak] =
    React.useState<boolean>(true);
  const [currentStreak, setCurrentStreak] = React.useState<number | null>(null);
  const [loadingCurrentStreak, setLoadingCurrentStreak] =
    React.useState<boolean>(true);
  const user_id = useSelector((state: RootState) => state.auth.user_id);
  const theme = useTheme();
  const dispatch = useDispatch();
  const numberStyle = {
    color: theme.colors.primary,
    fontWeight: "bold" as const,
    fontSize: 30,
  };
  useEffect(() => {
    if (user_id !== null && user_id !== undefined) {
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

  return (
    <View style={styles.container}>
      <Toast />
      <ProfileInfo />
      <View >
        <Text variant="displaySmall">Some Stats</Text>
        <Text variant="titleLarge">
          Total entries:{" "}
          {loadingTotalEntries ? (
            <ActivityIndicator animating={true} />
          ) : (
            <Text style={numberStyle}>{totalEntries}</Text>
          )}
        </Text>
        <Text variant="titleLarge">
          Longest streak:{" "}
          {loadingLongestStreak ? (
            <ActivityIndicator animating={true} />
          ) : (
            <Text style={numberStyle}>{longestStreak}</Text>
          )}
        </Text>
        <Text variant="titleLarge">
          Current streak:{" "}
          {loadingCurrentStreak ? (
            <ActivityIndicator animating={true}/>
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
  statTextsStyles:{
  }
});

export default Profile;
