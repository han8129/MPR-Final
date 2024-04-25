import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Job } from '../../models';
import { Color } from '../../constants/Color';
import { GameContext } from '../../store/GameContext';

interface JobModalProps {
    job: Job | null | undefined;
    closeModal: () => void;
    applyJob: () => void;
    quitJob: () => void;
}

const JobModal: React.FC<JobModalProps> = ({
    job,
    closeModal,
    applyJob,
    quitJob,
}) => {
    const context = React.useContext(GameContext);
    const isDoing = context?.jobs?.find((j: Job) => j?.name === job?.name);

    if (!job) return null;

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
                        <Text style={styles.modalTitle}>{job.name}</Text>
                        <TouchableOpacity onPress={closeModal}>
                            <Ionicons name='close' size={24} color='#333' />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            gap: 5,
                            flexDirection: 'column',
                        }}
                    >
                        <Text style={styles.modalDescription}>{job.desc}</Text>
                        <Text style={styles.detail}>Type: {job.type}</Text>
                        <Text style={styles.detail}>
                            Rate: ${job.effect.money}/month
                        </Text>
                        <Text style={styles.detail}>
                            Health Effect: {job.effect.health}
                        </Text>
                        <Text style={styles.detail}>
                            Smarts Effect: {job.effect.smarts}
                        </Text>
                        <Text style={styles.detail}>Requirements:</Text>
                        <Text
                            style={styles.requirement}
                        >
                            {'Education: ' }
                            {job.requirement.education
                                ? job.requirement.education
                                : 'None'}
                        </Text>
                        <Text style={styles.requirement}>
                            {'Age: ' + job.requirement.age}
                        </Text>
                        <Text style={styles.requirement}>
                            {'Health: ' + job.requirement.health}
                        </Text>
                        <Text style={styles.requirement}>
                            {'Smart: ' + job.requirement.smart}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        {isDoing ? (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={quitJob}
                            >
                                <Text style={styles.buttonText}>Quit</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={applyJob}
                            >
                                <Text style={styles.buttonText}>Apply</Text>
                            </TouchableOpacity>
                        )}
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
    requirement: {
        fontSize: 14,
        marginLeft: 14,
    },
});

export default JobModal;
