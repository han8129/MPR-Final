import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MODAL_SHARED_STYLE } from '../../styles'; 

const ModalHeader = ({
    title,
    closeModal,
}: {
    title: string;
    closeModal: () => void;
}) => (
    <View style={MODAL_SHARED_STYLE.modalHeader}>
        <Text style={MODAL_SHARED_STYLE.modalTitle}>{title}</Text>
        <TouchableOpacity onPress={closeModal}>
            <Ionicons name='close' size={24} color='#333' />
        </TouchableOpacity>
    </View>
);

export default ModalHeader;
