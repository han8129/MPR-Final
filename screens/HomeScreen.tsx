import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { Color } from "../constants/Color";
import { StatusBar } from "expo-status-bar";
import Header from "../components/game/Header";
import AgeStatus from "../components/game/AgeStatus";
import PlayerStats from "../components/game/PlayerStats";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const image = require("../assets/images/High.png");

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  const [health, setHealth] = useState(100);
  const [smarts, setSmarts] = useState(100);
  const [money, setMoney] = useState(100);
  const [age, setAge] = useState(18);
  const [title, setTitle] = useState("Student");
  const [username, setUsername] = useState("John Doe");

  const navigateDailyLogin = () => {
    navigation.navigate("DailyLogin");
  };

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Header username={username} userTitle={title} balance={money} />
        <AgeStatus age={age} value={50} color={Color.red} />
        <Image source={image} style={styles.image} resizeMode="contain" />
        <TouchableOpacity style={styles.dailyLoginbutton} onPress={navigateDailyLogin}>
          <Text style={styles.dailyText}>Daily Gift</Text>
        </TouchableOpacity>
        <PlayerStats health={health} smarts={smarts} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: "center",
  },
  image: {
    flex: 1,
  },
  dailyLoginbutton: {
    height: 40,
    width: 80,
    backgroundColor: Color.red,
    top: 0.57 * height,
    right: 30,
    position: "absolute",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dailyText: {
    color: Color.white,
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default HomeScreen;
