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
import { Job } from "../../screens/CareerScreen";
import { Color } from "../../constants/Color";

interface JobModalProps {
  job: Job | null;
  closeModal: () => void;
  applyJob: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, closeModal, applyJob }) => {
  if (!job) return null;

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
            <Text style={styles.modalTitle}>{job.name}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalDescription}>{job.desc}</Text>
          <Text style={styles.detail}>Type: {job.type}</Text>
          <Text style={styles.detail}>Rate: ${job.rate}/hour</Text>
          <Text style={styles.detail}>Age Needed: {job.ageNeeded}</Text>
          <Text style={styles.detail}>Health Effect: {job.healthEffect}</Text>
          <Text style={styles.detail}>Money Effect: {job.moneyEffect}</Text>
          <Text style={styles.detail}>Smarts Effect: {job.smartsEffect}</Text>
          <Text style={styles.detail}>
            Prerequisites:{" "}
            {job.prerequisites.length ? job.prerequisites.join(", ") : "None"}
          </Text>
          <View style={{alignItems: "center"}}>
            <TouchableOpacity style={styles.button} onPress={applyJob}>
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

export default JobModal;
