import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const LoginPage = () => {
  const [email, setEmail] = useState<String>("");
  const [hidePassword, sethidePassword] = useState<boolean>(true);
  return (
    <View
      style={{
        backgroundColor: "#f6f6f6",
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
          maxHeight: 350,
          minWidth: 400,
          padding: 20,
          borderRadius: 30,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 25,
        }}
      >
        <Text variant="titleLarge" style={{ paddingBottom: 40 }}>
          Login
        </Text>
        <TextInput
          style={{
            maxHeight: 55,
            minWidth: 300,
          }}
          mode="outlined"
          placeholder="Enter Your Email"
          onChange={(text) => {
            setEmail(text.nativeEvent.text);
          }}
        />
        <TextInput
          style={{
            maxHeight: 55,
            minWidth: 300,
          }}
          mode="outlined"
          placeholder="Enter Your password"
          secureTextEntry={hidePassword}
        //   eye-off-outline
          right={<TextInput.Icon icon={hidePassword?"eye-outline":"eye-off-outline"} onPress={()=>sethidePassword(state=>!state)}/>}
          onChange={(text) => {
            setEmail(text.nativeEvent.text);
          }}
        />
        <Button
          mode="contained"
          style={{ minWidth: 300 }}
          onPress={() => console.log("Hello")}
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

export default LoginPage;
