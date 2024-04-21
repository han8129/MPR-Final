import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import GameContextProvider from './store/GameContext';

export default function App() {
    return (
        <GameContextProvider>
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        </GameContextProvider>
    );
}
