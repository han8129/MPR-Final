import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../../constants/Color";
import { Education } from "../../screens/EducationScreen";

interface ModalProps {
  education: Education | null;
  closeModal: () => void;
  takeCourse: () => void;
}

const EducationModal: React.FC<ModalProps> = ({
  education,
  closeModal,
  takeCourse,
}) => {
  if (!education) return null;

  return (
    <Modal
      visible={education !== null}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{education.name}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalDescription}>{education.desc}</Text>
          <Text style={styles.detail}>
            Duration: {education.duration} months
          </Text>
          <Text style={styles.detail}>
            Health Effect: {education.healthEffect}
          </Text>
          <Text style={styles.detail}>
            Money Effect: {education.moneyEffect}
          </Text>
          <Text style={styles.detail}>
            Smarts Effect: {education.smartsEffect}
          </Text>
          <Text style={styles.detail}>Age Needed: {education.ageNeeded}</Text>
          <Text style={styles.detail}>
            Prerequisites:{" "}
            {education.prerequisites.length
              ? education.prerequisites.join(", ")
              : "None"}
          </Text>
          <Button
            title="Take Course"
            onPress={takeCourse}
            color={Color.black}
          />
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
});

export default EducationModal;
