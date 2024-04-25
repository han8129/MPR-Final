import React from 'react';
import { View, TextInput,Text } from 'react-native';
import { PASSWORD_INPUT_STYLES } from '../../styles/AuthStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

const PasswordInput = ({
    value,
    onChangeText,
    placeholder,
    isHidden,
    onPress,
    isError,
}: {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    isHidden: boolean;
    onPress: () => void;
    isError: boolean;
}) => {
    return (
        <View>
            <View style={PASSWORD_INPUT_STYLES.inputView}>
                <TextInput
                    style={[
                        PASSWORD_INPUT_STYLES.input,
                        isError && PASSWORD_INPUT_STYLES.errorInput,
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    secureTextEntry={isHidden}
                />
                <Ionicons
                    name={isHidden ? 'eye' : 'eye-off'}
                    size={20}
                    onPress={onPress}
                />
            </View>
            {isError && (
                <Text style={PASSWORD_INPUT_STYLES.errorText}>
                    Please enter a valid {placeholder.toLowerCase()}.
                </Text>
            )}
        </View>
    );
};


export default PasswordInput;
