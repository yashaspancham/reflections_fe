import { View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Text, TextInput, Button } from "react-native-paper";
import CardContainer from "@/components/auth/CardContainer";
import validator from "validator";
import Toast from "react-native-toast-message";
import { signUpAPI } from "@/utiles/apis/auth/signUp";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [hidePassword, sethidePassword] = useState<boolean>(true);
  const [ShowPasswordInfo, setShowPasswordInfo] = useState(false);
  const router=useRouter();

  const submitActions = () => {
    if (!validator.isEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Enter email in proper format",
      });
      return;
    }
    const isStrongPassword = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (!isStrongPassword) {
      setShowPasswordInfo(true);
      return;
    } else {
      setShowPasswordInfo(false);
    }
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Not the same password",
      });
      return;
    }
    signUpAPI(email, password).then((res) => {
      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Account Created redirecting to Login",
        });
      } else if (res.status === 200) {
        Toast.show({
          type: "error",
          text1: "Account exists redirecting to Login",
        });
      }
      if(res.status===201 || res.status===200){
        setTimeout(()=>{
          router.push("/login");
        },5000)
      }
      Toast.show({
        type:"error",
        text1:res.message,
      });
    });
  };
  return (
    <CardContainer>
      <Text variant="titleLarge">Create an Account</Text>
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
        <TextInput
          style={{
            marginTop: 10,
            maxHeight: 55,
            minWidth: 300,
          }}
          mode="outlined"
          value={confirmPassword}
          placeholder="Enter Your password"
          secureTextEntry={hidePassword}
          right={
            <TextInput.Icon
              icon={hidePassword ? "eye-outline" : "eye-off-outline"}
              onPress={() => sethidePassword((state) => !state)}
            />
          }
          onChange={(text) => {
            setConfirmPassword(text.nativeEvent.text);
          }}
        />
        {ShowPasswordInfo && (
          <Text
            variant="bodySmall"
            style={{ width: 300, color: "orange", marginTop: 10 }}
          >
            The password must have minLength:8, minLowercase: 1,
            minUppercase:1,minNumbers: 1, minSymbols: 1.
          </Text>
        )}
      </View>
      <Button
        mode="contained"
        style={{ minWidth: 300 }}
        onPress={() => submitActions()}
      >
        Submit
      </Button>
    </CardContainer>
  );
};

export default Signup;
