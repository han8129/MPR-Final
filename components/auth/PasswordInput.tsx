import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const PasswordInput = ({
  value,
  onChangeText,
  placeholder,
  isHidden,
  onPress,
  isError,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isHidden: boolean;
  onPress: () => void;
  isError: boolean;
}) => {
  return (
    <View>
      <View style={styles.inputView}>
        <TextInput
          style={[styles.input, isError && styles.errorInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isHidden}
        />
        <Ionicons
          name={isHidden ? "eye" : "eye-off"}
          size={20}
          onPress={onPress}
        />
      </View>
      {isError && (
        <Text style={styles.errorText}>
          Please enter a valid {placeholder.toLowerCase()}.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 60,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default PasswordInput;
