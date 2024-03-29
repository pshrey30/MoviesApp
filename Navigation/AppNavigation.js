import { Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import HomeScreen from '../Screens/HomeScreen';
import MovieScreen from '../Screens/MovieScreen';
import PersonScreen from '../Screens/PersonScreen';
import SearchScreen from '../Screens/SearchScreen';
import ViewAllScreen from '../Screens/ViewAllScreen';


const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
                <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
                <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
                <Stack.Screen name="ViewAll" options={{ headerShown: false }} component={ViewAllScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation