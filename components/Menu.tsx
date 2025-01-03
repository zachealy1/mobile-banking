import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from "react-native";

interface MenuContainerProps {
    titleOpacity: Animated.Value;
    title: string;
    borderOpacity: Animated.Value;
}

const Menu: React.FC<MenuContainerProps> = ({ titleOpacity, title, borderOpacity }) => {

    const onAccountPress = () => {
        console.log('Account pressed');
    }

    const onChatPress = () => {
        console.log('Chat pressed');
    }

    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuButton} onPress={onAccountPress}>
                <ThemedText style={styles.buttonText}>A</ThemedText>
            </TouchableOpacity>
            <Animated.Text style={[styles.menuTitle, { opacity: titleOpacity }]}>
                {title}
            </Animated.Text>
            <TouchableOpacity style={styles.menuButton} onPress={onChatPress}>
                <ThemedText style={styles.buttonText}>C</ThemedText>
            </TouchableOpacity>

            <Animated.View style={[styles.animatedBorder, { opacity: borderOpacity }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 110,  // Increased height to include the status bar area
        zIndex: 2,
        backgroundColor: '#ffffff',
        paddingTop: 50,  // Padding for the status bar
    },
    animatedBorder: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#ccc',  // Border color
    },
    menuButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    menuTitle: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        flex: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Menu;
