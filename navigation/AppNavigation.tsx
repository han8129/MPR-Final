// AppNavigation.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import EducationScreen from "../screens/EducationScreen";
import CareerScreen from "../screens/CareerScreen";
import ActivityScreen from "../screens/ActivityScreen";

import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="SignUp"
        options={{ headerShown: false }}
        component={SignUpScreen}
      />
      <Stack.Screen
        name="Game"
        options={{ headerShown: false }}
        component={GameNavigation}
      />
    </Stack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();

const GameNavigation = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: "red",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Education"
        component={EducationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" color={color} size={size} />
          ),
          tabBarActiveTintColor: "red",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Career"
        component={CareerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase" color={color} size={size} />
          ),
          tabBarActiveTintColor: "red",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" color={color} size={size} />
          ),
          tabBarActiveTintColor: "tomato",
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default AppNavigation;
