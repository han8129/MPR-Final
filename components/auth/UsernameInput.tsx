import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

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
            <View style={styles.inputView}>
                <TextInput
                    style={[styles.input, isError && styles.errorInput]}
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

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        height: 60,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        backgroundColor: 'white',
        padding: 8,
        marginVertical: 10,
        borderRadius: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
    },
});

export default Input;
