import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { Film, Heart, User } from 'lucide-react-native';


import DiscoverScreen from '../screens/DiscoverScreen';
import DetailsScreen from '../screens/DetailsScreen'; 
import WatchlistScreen from '../screens/WatchlistScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DiscoverStackNavigator(){
    return (
        <Stack.Navigator screenOptions={{ headerShown : false}}>
            <Stack.Screen name='Discover' component={DiscoverScreen}/>
            <Stack.Screen name='MovieDetails' component={DetailsScreen} />
        </Stack.Navigator>
    )
}


export default function TabNavigator() {
    return(
        <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1C1C1E', // Dark tab bar
          borderTopColor: '#2C2C2E',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#1E90FF', // Blue text for active tab
        tabBarInactiveTintColor: '#8E8E93', // Grey text for inactive tab
        headerShown: false, // We hide the global tab header because we built custom headers inside the screens!
      }}
    >
      {/* 3. Discover Tab (Now loads our Stack Navigator instead of just the screen!) */}
      <Tab.Screen
        name="DiscoverTab"
        component={DiscoverStackNavigator} // Loads the Stack containing Grid + Details
        options={{
          title: 'Discover',
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => <Film color={color} size={size} />,
        }}
      />
      {/* Watchlist Tab */}
      <Tab.Screen
        name="WatchlistTab"
        component={WatchlistScreen}
        options={{
          title: 'Watchlist',
          tabBarLabel: 'Watchlist',
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      {/* Profile Tab */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
    )
}