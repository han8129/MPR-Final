import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import GameContextProvider from './store/GameContext';

export default function App() {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                showAlertOnExit();
                return true; // Prevent default back button behavior
            }
        );

        return () => backHandler.remove(); // Clean up the event listener
    }, []);

    const showAlertOnExit = () => {
        Alert.alert(
            'Exit App',
            'Do you want to save your data before exiting?',
            [
                {
                    text: 'Save & Exit',
                    onPress: () => {
                        // Implement your logic to save data before exiting the app
                        saveDataAndExit();
                    },
                },
                {
                    text: 'Exit',
                    onPress: () => {
                        // Exit the app without saving data
                        BackHandler.exitApp();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const saveDataAndExit = () => {
        // Implement your logic to save data before exiting the app
        // Once data is saved, exit the app
        BackHandler.exitApp();
    };

    return (
        <GameContextProvider>
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        </GameContextProvider>
    );
}
