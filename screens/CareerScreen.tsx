import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Color } from "../constants/Color";

import { StatusBar } from "expo-status-bar";

interface Props {
  navigation: any;
}

const CareerScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Text style={styles.loginText}>Career</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: Color.white,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CareerScreen;
