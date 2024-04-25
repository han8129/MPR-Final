import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Relationship } from '../../screens/ActivityScreen';
import { Color } from '../../constants/Color';

interface RelationshipModalProps {
    rel: Relationship | null;
    closeModal: () => void;
    handleInteraction: () => void;
}

const RelationshipModal: React.FC<RelationshipModalProps> = ({
    rel,
    closeModal,
    handleInteraction,
}) => {
    if (!rel) return null;

    return (
        <Modal
            visible={true}
            animationType='slide'
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{rel.name}</Text>
                        <TouchableOpacity onPress={closeModal}>
                            <Ionicons name='close' size={24} color='#333' />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.modalDescription}>{rel.desc}</Text>
                    <Text style={styles.modalDescription}>
                        Marital Status: {rel.maritalStatus}
                    </Text>
                    <Text style={styles.modalDescription}>Job: {rel.work}</Text>

                    <View style={styles.buttonDiv}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleInteraction}
                        >
                            <Text style={styles.buttonText}>Ask for money</Text>
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
    button: {
        backgroundColor: Color.red,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '50%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonDiv: {
        alignItems: 'center',
    },
});

export default RelationshipModal;
