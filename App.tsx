import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./app/homescreen";
import BookDetailsScreen from "./app/bookdetail";
import { StyleSheet } from 'react-native';

// Define types for your navigation params (optional but recommended for TS)
export type RootStackParamList = {
  Home: undefined;
  BookDetails: { book: any; review: string }; // You can refine `any` to your Book type later
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Home' }}
          />
          <Stack.Screen
              name="BookDetails"
              component={BookDetailsScreen}
              options={{ title: 'Book Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
