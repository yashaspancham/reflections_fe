import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { RootState } from "@/utiles/redux/store";
import { useSelector } from "react-redux";
import { getUserData } from "@/utiles/apis/users/getUserData";

const Profile = () => {
  const user_email = useSelector((state: RootState) => state.auth.user_email);
  const user_id = useSelector((state: RootState) => state.auth.user_id);
  const theme = useTheme();
  const numberStyle = {
    color: theme.colors.primary,
    fontWeight: "bold" as const,
    fontSize: 16,
  };
  useEffect(() => {
    user_id!== null ? getUserData(user_id): {};
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/defaultProfilePic.png")}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user_email?.split("@")[0]}</Text>
      <Text style={styles.email}>{user_email}</Text>
      <View>
        <Text variant="titleLarge">Some Stats</Text>
        <Text>
          Total entries: <Text style={numberStyle}>34</Text>
        </Text>
        <Text>
          Longest streak: <Text style={numberStyle}>34</Text>
        </Text>
        <Text>
          Current streak: <Text style={numberStyle}>34</Text>
        </Text>
      </View>
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