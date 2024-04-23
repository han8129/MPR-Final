import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../constants/Color';
import { Education } from '../../models';

interface ModalProps {
    education: Education | null | undefined;
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
            animationType='slide'
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{education.name}</Text>
                        <TouchableOpacity onPress={closeModal}>
                            <Ionicons name='close' size={24} color='#333' />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.modalDescription}>
                        {education.desc}
                    </Text>
                    <Text style={styles.detail}>
                        Health Effect: {education.effect.health}
                    </Text>
                    <Text style={styles.detail}>
                        Money Effect: {education.effect.money}
                    </Text>
                    <Text style={styles.detail}>
                        Smarts Effect: {education.effect.smarts}
                    </Text>
                    <Text style={styles.detail}>
                        Happiness Effect: {education.effect.happiness}
                    </Text>
                    <Text style={styles.detail}>
                        Age Needed: {education.ageNeeded}
                    </Text>
                    <Text style={styles.detail}>
                        Prerequisites:{' '}
                        {education.prerequisite
                            ? education.prerequisite
                            : 'None'}
                    </Text>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={takeCourse}
                        >
                            <Text style={styles.buttonText}>Take Course</Text>
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

export default EducationModal;
