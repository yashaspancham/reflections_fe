import { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { useTheme, Button, Text, TextInput } from "react-native-paper";
import validator from 'validator';

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [hidePassword, sethidePassword] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [credentialsNotOk, setCredentialsNotOk] = useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme();
  const {width}=useWindowDimensions();
  const isMobileScreen=width < 640; 
  const submitActions=()=>{
    if(validator.isEmail(email) && password===" "){
      router.push("/");
      setCredentialsNotOk(false);
    }
    else{
      setCredentialsNotOk(true);
    }
  }
  return (
    <View
      style={{
        backgroundColor:isMobileScreen ? "#f6f0f6":"#f6f6f6",
        flex: 1,
        minHeight: 700,
        padding: 50,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
