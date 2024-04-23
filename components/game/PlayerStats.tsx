import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
                      <Text style={{ fontWeight: 'bold', color: Color.red }}>
                          Health{' '}
                      </Text>
                      <Ionicons name='heart' size={24} color={Color.red} />
                  </View>
                  <ProgressBar value={health} color={Color.black} />
              </View>
              <View style={styles.stat}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', color: Color.red }}>
                          Happiness{' '}
                      </Text>
                      <Ionicons name='happy' size={24} color={Color.red} />
                  </View>
                  <ProgressBar value={happiness} color={Color.black} />
              </View>
              <View style={styles.stat}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', color: Color.red }}>
                          Smarts{' '}
                      </Text>
                      <Ionicons name='book' size={24} color={Color.red} />
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
    height: 55,
  },
});

export default PlayerStats;
