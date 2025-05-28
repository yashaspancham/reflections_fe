import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme, Button, Text, TextInput } from "react-native-paper";
import validator from "validator";
import { loginAPI } from "@/utiles/apis/auth/login";
import Toast from "react-native-toast-message";
import CardContainer from "@/components/auth/CardContainer";
import { useDispatch } from "react-redux";
import { setLogin } from "@/utiles/redux/store/slices/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [hidePassword, sethidePassword] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [credentialsNotOk, setCredentialsNotOk] = useState<boolean>(false);
  const [disableSubmitButton, setDisableSubmitButton] =
    useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const submitActions = () => {
    if (email === "" || password === "") {
      Toast.show({
        type: "error",
        text1: "Enter both email and password",
      });
      setDisableSubmitButton(false);
      return;
    }

    if (!validator.isEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Enter valid email",
      });
      setDisableSubmitButton(false);
      return;
    }
    loginAPI(email, password).then((res) => {
      if (res.status === 200) {
        setCredentialsNotOk(false);
        Toast.show({
          type: "success",
          text1: res.message,
        });
        dispatch(
          setLogin({
            token: res.token,
            user_id: res.userData.id,
            user_email: res.userData.email,
          })
        );
        router.replace("/");
      } else {
        if (res.showPopUpMsg) {
          Toast.show({
            type: "error",
            text1: res.message,
          });
        } else {
          setCredentialsNotOk(true);
        }
      }
      setDisableSubmitButton(false);
    });
  };
  return (
    <CardContainer>
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
        onPress={() => {setDisableSubmitButton(true);submitActions()}}
        disabled={disableSubmitButton}
      >
        Submit
      </Button>
    </CardContainer>
  );
};

export default LoginPage;