import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text, ActivityIndicator, } from "react-native-paper";
import { RootState } from "@/utiles/redux/store";
import { useSelector } from "react-redux";
import { getUserName,  putUserName, } from "@/utiles/apis/users/users";
import Toast from "react-native-toast-message";

const ProfileInfo = () => {
  const [username, setUsername] = React.useState<string | null>(null);
  const [loadingUsername, setLoadingUsername] = React.useState<boolean>(true);
  const user_email = useSelector((state: RootState) => state.auth.user_email);
  const user_id = useSelector((state: RootState) => state.auth.user_id);
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
    <>
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
    </>
  );
};
export default ProfileInfo;

const styles = StyleSheet.create({
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
});
