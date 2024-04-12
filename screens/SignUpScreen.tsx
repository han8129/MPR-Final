import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Color } from "../constants/Color";

import TopBackground from "../components/auth/TopBackground";
import Input from "../components/auth/UsernameInput";
import PasswordInput from "../components/auth/PasswordInput";
import CustomButton from "../components/auth/CommonButton";
import { StatusBar } from "expo-status-bar";

interface Props {
  navigation: any; 
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isRePasswordHidden, setIsRePasswordHidden] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [rePasswordError, setRePasswordError] = useState<boolean>(false);

  const handleSignUp = () => {
    setEmailError(email === "");
    setPasswordError(password === "");
    setRePasswordError(rePassword === "" || rePassword !== password);

    if (email !== "" && password !== "" && rePassword !== "" && rePassword === password) {
      // call service to sign up
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <TopBackground />
        <View style={styles.inputContainer}>
          <Text style={styles.loginText}>Sign up</Text>

          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            isError={emailError}
          />
          <PasswordInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            isHidden={isPasswordHidden}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            isError={passwordError}
          />

          <PasswordInput
            value={password}
            onChangeText={setRePassword}
            placeholder="Confirm Password"
            isHidden={isRePasswordHidden}
            onPress={() => setIsRePasswordHidden(!isRePasswordHidden)}
            isError={rePasswordError}
          />

          <CustomButton onPress={handleSignUp} title="Sign up" />
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <Text>Already have an account ?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.toSignUp}>Login here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  loginText: {
    color: Color.black,
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
  },
  inputContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 2,
  },
  toSignUp: {
    color: Color.black,
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default LoginScreen;
