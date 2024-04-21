import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Color } from '../constants/Color';
import { GameContext } from '../store/GameContext';

interface Props {
	navigation: any;
}

const ChooseGenderScreen: React.FC<Props> = ({ navigation }) => {
    const context = useContext(GameContext);
    const [isMale, setIsMale] = useState<boolean>(true);

    const handleConfirmGender = () => {
        context.setGender(isMale ? 'male' : 'female');
        context.setIsPause(false);
        navigation.navigate('Game');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Choose Your Gender</Text>
            <View style={styles.genderContainer}>
                <TouchableOpacity onPress={() => setIsMale(true)}>
                    <Image
                        source={require('../assets/images/male0-5.png')}
                        style={[
                            styles.genderImage,
                            isMale && styles.selectedGenderImage,
                        ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsMale(false)}>
                    <Image
                        source={require('../assets/images/female0-5.png')}
                        style={[
                            styles.genderImage,
                            !isMale && styles.selectedGenderImage,
                        ]}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmGender}
            >
                <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    genderContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    genderImage: {
        width: 160,
        height: 200,
        marginRight: 20,
    },
    selectedGenderImage: {
        borderWidth: 2,
        borderColor: Color.red,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: Color.red,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.white,
    },
});

export default ChooseGenderScreen;
