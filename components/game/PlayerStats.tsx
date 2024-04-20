import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import ProgressBar from "./ProgressBar";
import { Color } from "../../constants/Color";

interface PlayerStatsProps {
  health: number;
  smarts: number;
  happiness: number;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ health, smarts, happiness }) => {
  return (
      <View style={styles.container}>
          <View style={styles.statCont}>
              <View style={styles.stat}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text>Health</Text>
                      <Ionicons name='heart' size={24} color={Color.black} />
                  </View>
                  <ProgressBar value={health} color={Color.black} />
              </View>
              <View style={styles.stat}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text>Happiness</Text>
                      <Ionicons name='heart' size={24} color={Color.black} />
                  </View>
                  <ProgressBar value={happiness} color={Color.black} />
              </View>
              <View style={styles.stat}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text>Smarts</Text>
                      <Ionicons name='person' size={24} color={Color.black} />
                  </View>
                  <ProgressBar value={smarts} color={Color.black} />
              </View>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E8F0",
  },
  statCont: {
    width: "80%", 
    justifyContent: "center",
    height: "100%",
    marginVertical: 10,
  },
  stat: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    height: 60,
  },
});

export default PlayerStats;
