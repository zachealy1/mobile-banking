import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="documents"
                options={{
                    title: 'Documents',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'document' : 'document-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="spending"  // Update the screen name if the route is renamed to 'spending'
                options={{
                    title: 'Spending',  // Update the title to 'Spending'
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'wallet' : 'wallet-outline'} color={color} />  // Use an appropriate icon for spending
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
