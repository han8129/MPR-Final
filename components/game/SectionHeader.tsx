import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface HeaderProps {
  heading: string;
}

const Header: React.FC<HeaderProps> = ({ heading }) => {
  return (
    <View style={styles.headerCont}>
      <Text style={styles.heading}>{heading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerCont: {
    backgroundColor: "#334155",
    width: "100%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 8,
    textAlign: "center",
    color: "#fff",
  },
});

export default Header;
