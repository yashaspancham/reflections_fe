import { View,Image } from "react-native";
import { Text } from "react-native-paper";
import { useCallback } from "react";
import { useFocusEffect,router } from "expo-router";
// import LottieView from "lottie-react-native";

const SuccessPage = () => {
      useFocusEffect(
        useCallback(() => {
    
          const timeout = setTimeout(() => {
            router.push("/");
          }, 500);
          return () => clearTimeout(timeout);
        }, [])
      );
  return (
    <View
      style={{
        flex: 1,
        padding: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff", 
      }}
    >
      <Text variant="displayLarge">Success</Text>
      <Image source={require("../../assets/images/test.jpg")} style={{width:300,height:300}}/>
      <Text variant="headlineSmall">Could not figure out Animation yet......have a Puppy</Text>
    </View>
  );
};

export default SuccessPage;
