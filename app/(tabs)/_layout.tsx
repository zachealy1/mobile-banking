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
                name="spending"
                options={{
                    title: 'Spending',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'wallet' : 'wallet-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="pay"
                options={{
                    title: 'Pay',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'card' : 'card-outline'} // Example: Card icon
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
