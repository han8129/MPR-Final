import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import GameContextProvider from './store/GameContext';
import SocialLoop from './components/game/SocialLoop';

export default function App() {
    return (
        <GameContextProvider>
            <SocialLoop />
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        </GameContextProvider>
    );
}
