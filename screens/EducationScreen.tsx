import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Color } from "../constants/Color";
import { StatusBar } from "expo-status-bar";
import Header from "../components/game/Header";
import Player from "../models/Player";
import SectionHeader from "../components/game/SectionHeader";
import ListScrollView from "../components/game/ListScrollView";
import EducationModal from "../components/game/EducationalModal";

interface Props {
  navigation: any;
}

export interface Education {
  ageNeeded: number;
  desc: string;
  duration: number;
  healthEffect: number;
  moneyEffect: number;
  name: string;
  smartsEffect: number;
  prerequisites: string[];
}

const EducationScreen: React.FC<Props> = ({ navigation }) => {
  const player = Player.getInstance();
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(
    null
  );
  const educationList: Education[] = [
    {
      ageNeeded: 6,
      desc: "Introduction to basic mathematical concepts such as counting, addition, subtraction, and simple geometry.",
      duration: 12,
      healthEffect: -3,
      moneyEffect: 0,
      name: "Basic Mathematics",
      smartsEffect: 15,
      prerequisites: [],
    },
    {
      ageNeeded: 6,
      desc: "Develop foundational language skills including reading, writing, speaking, and listening through storytelling, phonics, and vocabulary building.",
      duration: 12,
      healthEffect: -3,
      moneyEffect: 0,
      name: "Language and Literacy",
      smartsEffect: 15,
      prerequisites: [],
    },
    {
      ageNeeded: 7,
      desc: "Engage in hands-on science activities to explore topics such as plants, animals, weather, and the environment.",
      duration: 12,
      healthEffect: -3,
      moneyEffect: 0,
      name: "Science Exploration",
      smartsEffect: 15,
      prerequisites: [],
    },
    {
      ageNeeded: 8,
      desc: "Express creativity through various art forms including drawing, painting, sculpture, and crafting using different materials and techniques.",
      duration: 12,
      healthEffect: -3,
      moneyEffect: 0,
      name: "Arts and Crafts",
      smartsEffect: 15,
      prerequisites: [],  
    },
  ];

  const filterEducationList = () => {
    return educationList.filter(
      (education) => education.ageNeeded <= player.getAge()
    );
  };

  const handleEducationPress = (index: number) => {
    setSelectedEducation(educationList[index]);
  };

  const takeCourse = () => {
    // Implement course taking logic here
    setSelectedEducation(null);
  };

  const closeModal = () => {
    setSelectedEducation(null);
  };

  const progressState: boolean[] = [true, false];

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Header
          username={player.getName()}
          userTitle={player.getTitle()}
          balance={player.getMoney()}
        />

        <SectionHeader heading="Available Education" />

        <ListScrollView
          itemList={filterEducationList()}
          onPressItem={handleEducationPress}
          progressState={progressState}
        />

        <EducationModal
          education={selectedEducation}
          closeModal={closeModal}
          takeCourse={takeCourse}
        />
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
});

export default EducationScreen;
