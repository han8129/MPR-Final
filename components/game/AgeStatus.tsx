import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "./ProgressBar";

interface AgeStatusProps {
  age: number;
  value: number;
  color: string;
}

const AgeStatus: React.FC<AgeStatusProps> = ({ age, value, color }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.ageText}>Your current age: {age}</Text>
      <ProgressBar value={value} color={color}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
    width: "80%",
  },
  ageText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AgeStatus;
