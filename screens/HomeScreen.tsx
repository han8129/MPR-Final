import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { Color } from "../constants/Color";
import { StatusBar } from "expo-status-bar";
import Header from "../components/game/Header";
import AgeStatus from "../components/game/AgeStatus";
import PlayerStats from "../components/game/PlayerStats";
import EventModal from "../components/game/EventModal";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const image = require("../assets/images/High.png");

interface Props {
  navigation: any;
}

export interface Option {
  desc: string;
  healthEffect: number;
  moneyEffect: number;
  smartsEffect: number;
}

export interface Event {
  desc: string;
  name: string;
  options: Option[];
}

const eventData = [
  {
    desc: "You inherit a fortune from your long-lost relative who was a professional clown. Turns out, laughter really is the best medicine... and the best inheritance!",
    name: "Inheritance",
    options: [
      {
        desc: "Invest the money wisely",
        healthEffect: 0,
        moneyEffect: 30000,
        smartsEffect: 0,
      },
      {
        desc: "Start a clown-themed amusement park.",
        healthEffect: 0,
        moneyEffect: 20000,
        smartsEffect: 0,
      },
      {
        desc: "Buy a life-time supply of rupper duckies",
        healthEffect: 25,
        moneyEffect: 0,
        smartsEffect: -10,
      },
    ],
  },
  {
    desc: "You win a free weekend at a health retreat where the highlight is group sessions of goat yoga. Who knew downward-facing dog could be so adorable?",
    name: "Health Retreat",
    options: [
      {
        desc: "Participate in all health activities.",
        healthEffect: 50,
        moneyEffect: 0,
        smartsEffect: 0,
      },
      {
        desc: "Skip and binge-watch TV instead.",
        healthEffect: 0,
        moneyEffect: 0,
        smartsEffect: 0,
      },
      {
        desc: "Attend but sneak snacks and nap during yoga.",
        healthEffect: 25,
        moneyEffect: 0,
        smartsEffect: -10,
      },
    ],
  },
  {
    desc: "You win a scholarship for your groundbreaking research on the correlation between pizza consumption and productivity. Finally, your love for pizza pays off in more ways than one!",
    name: "Scholarship",
    options: [
      {
        desc: "Accept and pursue academic goals.",
        healthEffect: 0,
        moneyEffect: 0,
        smartsEffect: 30,
      },
      {
        desc: "Decline and take out student loans.",
        healthEffect: 0,
        moneyEffect: 0,
        smartsEffect: 0,
      },
      {
        desc: "Use to explore interests and take a gap year.",
        healthEffect: 0,
        moneyEffect: 10000,
        smartsEffect: 10,
      },
    ],
  },
  {
    desc: "You catch a flu strain that gives you a temporary chicken cluck instead of a cough. Looks like you'll be communicating in poultry for a while!",
    name: "Flu Outbreak",
    options: [
      {
        desc: "Seek medical treatment.",
        healthEffect: -60,
        moneyEffect: -5000,
        smartsEffect: 0,
      },
      {
        desc: "Tough it out with home remedies.",
        healthEffect: -50,
        moneyEffect: 0,
        smartsEffect: 0,
      },
      {
        desc: "Embrace clucking and entertain friends.",
        healthEffect: -50,
        moneyEffect: 0,
        smartsEffect: 10,
      },
    ],
  },
  {
    desc: "You develop a rare condition where you hiccup whenever someone says the word 'banana.' Let's hope you don't encounter any monkeys anytime soon!",
    name: "Chronic Condition",
    options: [
      {
        desc: "Consult specialists.",
        healthEffect: -20,
        moneyEffect: -10000,
        smartsEffect: 0,
      },
      {
        desc: "Ignore and hope it goes away.",
        healthEffect: -30,
        moneyEffect: 0,
        smartsEffect: 0,
      },
      {
        desc: "Embrace quirk and become viral sensation.",
        healthEffect: 0,
        moneyEffect: 0,
        smartsEffect: 10,
      },
    ],
  },
  {
    desc: "Your attempt at cooking a fancy meal ends in disaster when you mistake sugar for salt. The resulting dish is so salty, even the salt shaker is offended!",
    name: "Food Poisoning",
    options: [
      {
        desc: "Seek medical attention.",
        healthEffect: -30,
        moneyEffect: -3000,
        smartsEffect: 0,
      },
      {
        desc: "Throw out and order takeout.",
        healthEffect: -35,
        moneyEffect: 0,
        smartsEffect: 0,
      },
      {
        desc: "Brave it out and try eating.",
        healthEffect: -30,
        moneyEffect: 0,
        smartsEffect: 10,
      },
    ],
  },
  {
    desc: "You and mom got in a car crash after a naked clown jumped in front of the car, resulting in the car crashing in the nearby prison.",
    name: "Car Crash",
    options: [
      {
        desc: "Call the Ambulance and save everyone",
        healthEffect: -10,
        moneyEffect: -10000,
        smartsEffect: 0,
      },
      {
        desc: "Try to start the car and run over the clown again",
        healthEffect: 0,
        moneyEffect: -5000,
        smartsEffect: 0,
      },
      {
        desc: "Break Khá Bảnh out of jail",
        healthEffect: 0,
        moneyEffect: 2000,
        smartsEffect: 20,
      },
    ],
  },
  {
    desc: "Attempting to learn how to fly while fixing the roof, you take a leap of faith. Gravity reminds you of your stupidity",
    name: "Fall from Ladder",
    options: [
      {
        desc: "Get patched up.",
        healthEffect: -30,
        moneyEffect: -5000,
        smartsEffect: 0,
      },
      {
        desc: "Do nothing and accept your fate",
        healthEffect: -50,
        moneyEffect: 0,
        smartsEffect: 0,
      },
      {
        desc: "Attempt to fly again",
        healthEffect: 0,
        moneyEffect: 0,
        smartsEffect: -20,
      },
    ],
  },
  {
    desc: "You play chicken with a truck, but the truck isn't playing games. It turns you into a human pancake. Looks like your daredevil moment just got squished.",
    name: "Hit by a Truck",
    options: [
      {
        desc: "Seek medical attention.",
        healthEffect: -50,
        moneyEffect: -11000,
        smartsEffect: 0,
      },
      {
        desc: "Pretend it was a stunt.",
        healthEffect: -70,
        moneyEffect: 0,
        smartsEffect: 0,
      },
      {
        desc: "Embrace survival and plan your superhero alter ego.",
        healthEffect: -40,
        moneyEffect: 0,
        smartsEffect: -20,
      },
    ],
  },
  {
    desc: "You started a 36 hours coding streak to finish your MPR final project. You felt a chest pain after one night and failed to finish the project.",
    name: "Heart Attack",
    options: [
      {
        desc: "Sign out of the Earth's server.",
        healthEffect: -100,
        moneyEffect: 0,
        smartsEffect: 0,
      },
    ],
  },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  const [health, setHealth] = useState(100);
  const [smarts, setSmarts] = useState(100);
  const [money, setMoney] = useState(100);
  const [age, setAge] = useState(18);
  const [title, setTitle] = useState("Student");
  const [username, setUsername] = useState("John Doe");

  const [randomEvent, setRandomEvent] = useState<Event | null>(null);

  useEffect(() => {
    const randomIndex = eventData.length - 1;
    const event = eventData[randomIndex];
    const options = event.options || [];
    const updatedEvent = { ...event, options };
    setRandomEvent(updatedEvent);
  }, []);

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
        <EventModal event={randomEvent} closeModal={() => setRandomEvent(null)} />
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
