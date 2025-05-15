import { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { useTheme, Button, Text, TextInput } from "react-native-paper";
import validator from "validator";
import { loginAPI } from "@/apis/auth/login";
import Toast from "react-native-toast-message";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [hidePassword, sethidePassword] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [credentialsNotOk, setCredentialsNotOk] = useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const isMobileScreen = width < 640;
  const submitActions = () => {
    if(email==="" || password===""){
      Toast.show({
        type: "error",
        text1: "Enter both email and password",
      });
      return;
    }


    if (!validator.isEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Enter valid email",
      });
      return;
    }
    loginAPI(email, password).then((res) => {
      if (res.success) {
        setCredentialsNotOk(false);
        Toast.show({
          type: "success",
          text1: res.message,
        });
        router.push("/");
      } else {
        setCredentialsNotOk(true);
        if (res.showPopUpMsg) {
          Toast.show({
            type: "error",
            text1: res.message,
          });
        }
      }
    });
  };
  return (
    <View
      style={{
        backgroundColor: isMobileScreen ? "#f6f0f6" : "#f6f6f6",
        flex: 1,
        minHeight: 700,
        padding: 50,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Toast />
      <View
        style={{
          backgroundColor: "#f6f0f6",
          maxHeight: 400,
          minWidth: 400,
          padding: 20,
          borderRadius: 30,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 25,
        }}
      >
        <Text variant="titleLarge" style={{ paddingBottom: 15 }}>
          Login
        </Text>
        <TextInput
          style={{
            maxHeight: 55,
            minWidth: 300,
          }}
          value={email}
          mode="outlined"
          placeholder="Enter Your Email"
          onChange={(text) => {
            setEmail(text.nativeEvent.text);
          }}
        />

        <View>
          <TextInput
            style={{
              maxHeight: 55,
              minWidth: 300,
            }}
            mode="outlined"
            value={password}
            placeholder="Enter Your password"
            secureTextEntry={hidePassword}
            right={
              <TextInput.Icon
                icon={hidePassword ? "eye-outline" : "eye-off-outline"}
                onPress={() => sethidePassword((state) => !state)}
              />
            }
            onChange={(text) => {
              setPassword(text.nativeEvent.text);
            }}
          />
          {credentialsNotOk && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              Invalid Password or email
            </Text>
          )}
          <Text variant="labelMedium" style={{ paddingTop: 10 }}>
            No account, sign-up{" "}
            <Text
              onPress={() => router.push("/signup")}
              style={{ textDecorationLine: "underline", color: "blue" }}
            >
              Here
            </Text>
          </Text>
        </View>

        <Button
          mode="contained"
          style={{ minWidth: 300 }}
          onPress={() => submitActions()}
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

export default LoginPage;
