import React from 'react';
import { View, Modal } from 'react-native';
import { Activity, Education, Job } from '../../models';
import { MODAL_SHARED_STYLE } from '../../styles';
import ModalHeader from './ModalHeader';
import ModalDetails from './ModalDetails';
import ModalButton from './ModalButton';

interface ModalProps {
    modalObject: Education | Activity | Job | null | undefined;
    closeModal: () => void;
    handlePress: () => void;
    buttonText: string;
}

const EducationModal: React.FC<ModalProps> = ({
    modalObject,
    closeModal,
    handlePress,
    buttonText,
}) => {
    if (!modalObject) return null;

    return (
        <Modal
            visible={modalObject !== null}
            animationType='slide'
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={MODAL_SHARED_STYLE.modalContainer}>
                <View style={MODAL_SHARED_STYLE.modalContent}>
                    <ModalHeader
                        title={modalObject.name}
                        closeModal={closeModal}
                    />
                    <ModalDetails
                        description={modalObject.desc}
                        ageNeeded={modalObject.ageNeeded}
                        effect={modalObject.effect}
                        prerequisite={modalObject.prerequisite}
                    />
                    <ModalButton
                        onPress={handlePress}
                        buttonText={buttonText}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default EducationModal;
