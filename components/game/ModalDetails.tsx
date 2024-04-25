import React from 'react';
import { View, Text } from 'react-native';
import { MODAL_SHARED_STYLE } from '../../styles'; 
import { Effect } from '../../models';

const ModalDetails = ({
    description,
    ageNeeded,
    effect,
    prerequisite,
}: {
    description: string;
    ageNeeded: number;
    effect: Effect;
    prerequisite: string;
}) => (
    <View>
        <Text style={MODAL_SHARED_STYLE.modalDescription}>{description}</Text>
        <Text style={MODAL_SHARED_STYLE.detail}>Age Needed: {ageNeeded}</Text>
        <Text style={MODAL_SHARED_STYLE.detail}>
            Health Effect: {effect.health}
        </Text>
        <Text style={MODAL_SHARED_STYLE.detail}>
            Money Effect: {effect.money}
        </Text>
        <Text style={MODAL_SHARED_STYLE.detail}>
            Happiness Effect: {effect.happiness}
        </Text>
        <Text style={MODAL_SHARED_STYLE.detail}>
            Smarts Effect: {effect.smarts}
        </Text>
        <Text style={MODAL_SHARED_STYLE.detail}>
            Prerequisites: {prerequisite || 'None'}
        </Text>
    </View>
);

export default ModalDetails;
