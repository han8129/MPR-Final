import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { Color } from "../../constants/Color";
import { Event } from "../../screens/HomeScreen";
import { Option } from "../../screens/HomeScreen";
import Player from "../../models/Player";

interface ModalProps {
  event: Event | null;
  closeModal: () => void;
}

const EventModal: React.FC<ModalProps> = ({ event, closeModal }) => {
  const player = Player.getInstance();

  const handleOption = (option: Option) => {
    // implement the logic of the chosen option to player
    player.updateHealth(option.healthEffect);
    player.updateMoney(option.moneyEffect);
    player.updateSmarts(option.smartsEffect);
    // close the modal
    closeModal();
  };

  if (!event) return null;

  return (
    <Modal
      visible={event !== null}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{event.name}</Text>
          </View>
          <Text style={styles.modalDescription}>{event.desc}</Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {event.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionContainer}
                onPress={handleOption.bind(null, option)}
              >
                <Text style={{ color: Color.white, fontWeight: "bold", fontSize:14, textAlign: "center" }}>{option.desc}</Text>
              </TouchableOpacity>
            ))}
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
  optionContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: Color.red,
    width: "80%",
  },
});

export default EventModal;
