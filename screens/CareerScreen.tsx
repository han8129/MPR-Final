import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Color } from "../constants/Color";
import { StatusBar } from "expo-status-bar";
import Header from "../components/game/Header";
import Player from "../models/Player";
import SectionHeader from "../components/game/SectionHeader";
import ListScrollView from "../components/game/ListScrollView";
import JobModal from "../components/game/JobModal";

interface Props {
  navigation: any;
}

export interface Job {
  ageNeeded: number;
  desc: string;
  duration: number;
  healthEffect: number;
  moneyEffect: number;
  name: string;
  smartsEffect: number;
  prerequisites: string[];
  rate: number;
  type: string;
}

const EducationScreen: React.FC<Props> = ({ navigation }) => {
  const player = Player.getInstance();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const JobList: Job[] = [
    {
      ageNeeded: 18,
      desc: "Work as a freelance web designer, creating custom website designs for clients based on their requirements and preferences.",
      healthEffect: -5,
      name: "Freelance Web Designer",
      rate: 200,
      smartsEffect: 10,
      type: "Part-time",
      duration: 0,
      moneyEffect: 0,
      prerequisites: [],
    },
    {
      ageNeeded: 18,
      desc: "Write articles, blog posts, and other content on various topics for websites, blogs, and online publications.",
      healthEffect: -5,
      name: "Content Writer",
      rate: 180,
      smartsEffect: 15,
      type: "Part-time",
      duration: 0,
      moneyEffect: 0,
      prerequisites: [],
    },
    {
      ageNeeded: 18,
      desc: "Manage social media accounts for businesses and organizations, creating content, scheduling posts, and engaging with followers.",
      healthEffect: -5,
      name: "Social Media Manager",
      rate: 220,
      smartsEffect: 10,
      type: "Part-time",
      duration: 0,
      moneyEffect: 0,
      prerequisites: [],
    },
    {
      ageNeeded: 18,
      desc: "Provide tutoring services to students in various subjects or specialized areas through online platforms.",
      healthEffect: -5,
      name: "Online Tutor",
      rate: 250,
      smartsEffect: 20,
      type: "Part-time",
      duration: 0,
      moneyEffect: 0,
      prerequisites: [],
    },
    {
      ageNeeded: 18,
      desc: "Create visual concepts and designs for websites, advertisements, and other marketing materials.",
      healthEffect: -5,
      name: "Graphic Designer",
      rate: 230,
      smartsEffect: 15,
      type: "Part-time",
      duration: 0,
      moneyEffect: 0,
      prerequisites: [],
    },
    {
      ageNeeded: 20,
      desc: "Work as a front-end developer, creating and maintaining user-facing features and interfaces for websites and web applications.",
      healthEffect: -10,
      name: "Front-end Developer",
      prerequisites: ["Web Development"],
      rate: 2500,
      smartsEffect: 30,
      type: "Full-time",
      duration: 0,
      moneyEffect: 0,
    },
  ];

  const filterJobList = () => {
    return JobList.filter(
      (education) => education.ageNeeded <= player.getAge()
    );
  };

  const handleEducationPress = (index: number) => {
    setSelectedJob(JobList[index]);
  };

  const applyJob = () => {
    // Implement course applying logic here
    setSelectedJob(null);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  const progressState: boolean[] = [true, false, true, false, true, false];

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Header
          username={player.getName()}
          userTitle={player.getTitle()}
          balance={player.getMoney()}
        />
        <SectionHeader heading="Available Job" />

        <ListScrollView
          itemList={filterJobList()}
          onPressItem={handleEducationPress}
          progressState={progressState}
        />

        <JobModal job={selectedJob} closeModal={closeModal} applyJob={applyJob} />
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
