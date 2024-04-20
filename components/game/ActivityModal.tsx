import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../../constants/Color";
import { Activity } from "../../models";

interface ActivityModalProps {
  act: Activity | null;
  closeModal: () => void;
  applyActivity: () => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ act, closeModal, applyActivity }) => {
  if (!act) return null;

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{act.name}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalDescription}>{act.desc}</Text>
          <Text style={styles.detail}>Age Needed: {act.ageNeeded}</Text>
          <Text style={styles.detail}>Health Effect: {act.effect.health}</Text>
          <Text style={styles.detail}>Money Effect: {act.effect.money}</Text>
          <Text style={styles.detail}>Happiness Effect: {act.effect.happiness}</Text>
          <Text style={styles.detail}>Smarts Effect: {act.effect.smarts}</Text>
          <Text style={styles.detail}>
            Prerequisites:{" "}
            {act.prerequisite ? act.prerequisite : "None"}
          </Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.button} onPress={applyActivity}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: Color.red,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ActivityModal;
