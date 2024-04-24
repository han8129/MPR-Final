import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../constants/Color';
import { Relationship, Option } from '../../models';

interface ModalProps {
    relationship: Relationship | null | undefined;
    handleOptionPress: (option: Option) => void; // Updated prop
}

const RelationshipEventModal: React.FC<ModalProps> = ({
    relationship,
    handleOptionPress, // Updated prop
}) => {
    if (!relationship) return null;

    return (
        <Modal
            visible={relationship !== null}
            animationType='slide'
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            {relationship.npc.name}
                        </Text>
                    </View>
                    <Text style={styles.modalDescription}>
                        {relationship.desc}
                    </Text>
                    <Text style={styles.detail}>
                        Health: {relationship.npc.health}
                    </Text>
                    <Text style={styles.detail}>
                        Money: {relationship.npc.money}
                    </Text>
                    <Text style={styles.detail}>
                        Smarts: {relationship.npc.smarts}
                    </Text>
                    <Text style={styles.detail}>
                        Happiness: {relationship.npc.happiness}
                    </Text>
                    <Text style={styles.detail}>
                        Relationship Type: {relationship.npc.relationshipType}
                    </Text>
                    {relationship.npc.maritalStatus && (
                        <Text style={styles.detail}>
                            Marital Status: {relationship.npc.maritalStatus}
                        </Text>
                    )}
                    {relationship.npc.work && (
                        <Text style={styles.detail}>
                            Work: {relationship.npc.work}
                        </Text>
                    )}
                    <View style={{ alignItems: 'center' }}>
                        {/* Updated button to use handleOptionPress */}
                        {relationship.options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.button}
                                onPress={() => handleOptionPress(option)}
                            >
                                <Text style={styles.buttonText}>
                                    {option.desc}
                                </Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
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
        alignItems: 'center',
        marginTop: 10,
        width: '50%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RelationshipEventModal;
