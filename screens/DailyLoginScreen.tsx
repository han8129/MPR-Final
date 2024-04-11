import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/game/Header";
import { Color } from "../constants/Color";

interface Props {
  navigation: any;
}

const DailyLoginScreen: React.FC<Props> = ({ navigation }) => {
  const daysOfWeek = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
  ];
  const moneyPerDay = [10, 20, 30, 40, 50, 60, 70]; // Example money values for each day

  const navigateBack = () => {
    navigation.goBack();
  };

  const currentDayIndex = 0; // Change this value to highlight current day

  return (
    <View style={styles.container}>
      <Header username={"asdfa"} userTitle={'title'} balance={100} />
      <TouchableOpacity onPress={navigateBack}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.heading}>Daily Login</Text>
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayItem,
              index === currentDayIndex && styles.currentDay,
            ]}
          >
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.moneyText}>${moneyPerDay[index]}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Take Money</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  dayItem: {
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "lightgrey",
  },
  currentDay: {
    backgroundColor: "#94A3B8",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  moneyText: {
    fontSize: 14,
  },
  buttonContainer: {
    backgroundColor: Color.black, 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default DailyLoginScreen;
