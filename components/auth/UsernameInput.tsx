import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { INPUT_STYLES } from '../../styles/AuthStyles';

const Input = ({
    value,
    onChangeText,
    placeholder,
    isError,
}: {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    isError: boolean;
}) => {
    return (
        <View>
            <View style={INPUT_STYLES.inputView}>
                <TextInput
                    style={[
                        INPUT_STYLES.input,
                        isError && INPUT_STYLES.errorInput,
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                />
            </View>
            {isError && (
                <Text style={{ color: 'red' }}>
                    Please enter a valid {placeholder.toLowerCase()}.
                </Text>
            )}
        </View>
    );
};

export default Input;
