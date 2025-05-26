import { View, Image } from "react-native";
import { useCallback } from "react";
import { useFocusEffect, router } from "expo-router";

const SuccessPage = () => {
  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        router.push("/");
      }, 7000);
      return () => clearTimeout(timeout);
    }, [])
  );
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={require("../../assets/images/successAnimation.gif")}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default SuccessPage;
