import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Color } from "../constants/Color";

import TopBackground from "../components/auth/TopBackground";
import Input from "../components/auth/UsernameInput";
import PasswordInput from "../components/auth/PasswordInput";
import CustomButton from "../components/auth/CommonButton";
import { StatusBar } from "expo-status-bar";

interface Props {
  navigation: any; // Adjust type according to your navigation prop type
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleLogin = () => {
    setEmailError(email === "");
    setPasswordError(password === "");

    if (email !== "" && password !== "") {
      // call service to sign in
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <>
      <StatusBar  hidden={true} />
      <View style={styles.container}>
        <TopBackground />
        <View style={styles.inputContainer}>
          <Text style={styles.loginText}>Log in</Text>

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

          <CustomButton onPress={handleLogin} title="Login" />
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <Text>Don't have any account ?</Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.toSignUp}>Sign up here</Text>
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
    flex: 2
  },
  toSignUp: {
    color: Color.black,
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default LoginScreen;
