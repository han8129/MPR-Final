import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Color } from "../constants/Color";
import { StatusBar } from "expo-status-bar";
import Header from "../components/game/Header";
import SectionHeader from "../components/game/SectionHeader";
import ListScrollView from "../components/game/ListScrollView";
import RelationshipModal from "../components/game/RelationshipModal";
import ActivityModal from "../components/game/ActivityModal";

interface Props {
  navigation: any;
}

export interface Relationship {
  name: string;
  desc: string;
  maritalStatus: string;
  work: string;
}

export interface Activity {
  ageNeeded: number;
  desc: string;
  duration: number;
  healthEffect: number;
  moneyEffect: number;
  name: string;
  prerequisites: string[];
}

const ActivityScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedRelationship, setSelectedRelationship] =
    useState<Relationship | null>(null);

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const relationships: Relationship[] = [
    {
      name: "Robert Downey Jr.",
      desc: "Father",
      maritalStatus: "Married to Scarlett Johansson",
      work: "Actor for Marvel Studios",
    },
    {
      name: "Scarlett Johansson",
      desc: "Mother",
      maritalStatus: "Married to Robert Downey Jr.",
      work: "Actress for Marvel Studios",
    },
  ];

  const activities: Activity[] = [
    {
      ageNeeded: 16,
      desc: "Take a course to learn basic computer skills such as using operating systems, word processing, and internet browsing.",
      duration: 3,
      healthEffect: 0,
      moneyEffect: -500,
      name: "Basic Computer Skills Course",
      prerequisites: [],
    },
    {
      ageNeeded: 16,
      desc: "Acquire a foundational understanding of programming concepts such as variables, control structures, and functions.",
      duration: 6,
      healthEffect: -5,
      moneyEffect: -1000,
      name: "Understanding of Programming Concepts",
      prerequisites: ["Basic Computer Skills Course"],
    },
    {
      ageNeeded: 18,
      desc: "Join an intensive bootcamp focused on front-end development. Learn HTML, CSS, and JavaScript to build interactive and visually appealing websites.",
      duration: 6,
      healthEffect: -15,
      moneyEffect: -5000,
      name: "Front-end Development Bootcamp",
      prerequisites: ["Understanding of Programming Concepts"],
    },
    {
      ageNeeded: 18,
      desc: "Join an intensive bootcamp focused on front-end development. Learn HTML, CSS, and JavaScript to build interactive and visually appealing websites.",
      duration: 6,
      healthEffect: -15,
      moneyEffect: -5000,
      name: "Front-end Development Bootcamp",
      prerequisites: ["Understanding of Programming Concepts"],
    },
    {
      ageNeeded: 18,
      desc: "Join an intensive bootcamp focused on front-end development. Learn HTML, CSS, and JavaScript to build interactive and visually appealing websites.",
      duration: 6,
      healthEffect: -15,
      moneyEffect: -5000,
      name: "Front-end Development Bootcamp",
      prerequisites: ["Understanding of Programming Concepts"],
    },
  ];

  const handleRelPress = (index: number) => {
    setSelectedRelationship(relationships[index]);
  };

  const handleInteraction = () => {};

  const handleActivityPress = (index: number) => {
    setSelectedActivity(activities[index]);
  };

  const handleApplyActivity = () => {};

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Header username={"John Doe"} userTitle={"Student"} balance={100} />
        <ScrollView style={{ width: "100%" }}>
          <SectionHeader heading="Your Relationships" />
          <ListScrollView
            itemList={relationships}
            onPressItem={handleRelPress}
            progressState={[true, true]}
          />
          <SectionHeader heading="Available Activities" />
          <ListScrollView
            itemList={activities}
            onPressItem={handleActivityPress}
            progressState={[true, false, false, true]}
          />
        </ScrollView>
        <RelationshipModal
          rel={selectedRelationship}
          closeModal={() => setSelectedRelationship(null)}
          handleInteraction={handleInteraction}
        />
        <ActivityModal 
          act={selectedActivity}
          closeModal={() => setSelectedActivity(null)}
          applyActivity={handleApplyActivity}
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

export default ActivityScreen;
