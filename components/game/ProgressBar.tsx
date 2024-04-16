import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProgressBarProps {
  value: number;
  color: string;
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color,
  height = 20,
}) => {
  return (
    <>
      <View style={[styles.progressBar, { height }]}>
        <View
          style={[
            styles.progress,
            { width: `${value}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{`${value}%`}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    position: "relative", // To position text absolutely
  },
  progress: {
    height: "100%",
  },
  progressText: {
    position: "absolute",
    top: 20,
    left: 0,
    right: -300,
    bottom: 0,
    textAlign: "center",
    lineHeight: 15, // Match the height of progress bar
    color: "black",
  },
});

export default ProgressBar;
