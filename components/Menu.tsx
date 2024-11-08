import React from 'react';
import { View, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { currencyFullNames } from '@/constants/Data';
import { StyleSheet } from "react-native";

interface MenuContainerProps {
    currencyTitleOpacity: Animated.Value;
    currentCurrency: string;
    borderOpacity: Animated.Value;
    chat: () => void;
    account: () => void;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ currencyTitleOpacity, currentCurrency, borderOpacity, account, chat }) => {
    const width = Dimensions.get('window').width;

    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuButton} onPress={account}>
                <ThemedText style={styles.buttonText}>A</ThemedText>
            </TouchableOpacity>
            <Animated.Text style={[styles.currencyTitle, { opacity: currencyTitleOpacity }]}>
                {currentCurrency} - {currencyFullNames[currentCurrency as keyof typeof currencyFullNames]}
            </Animated.Text>
            <TouchableOpacity style={styles.menuButton} onPress={chat}>
                <ThemedText style={styles.buttonText}>C</ThemedText>
            </TouchableOpacity>

            {/* Animated border */}
            <Animated.View style={[styles.animatedBorder, { opacity: borderOpacity }]} />
        </View>
    );
};

export default MenuContainer;

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 120,  // Increase the height to include the status bar area
        zIndex: 2,
        backgroundColor: '#ffffff',
        paddingTop: 60,  // Add padding to account for the status bar (adjust if needed)
    },
    animatedBorder: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#ccc',  // The border color
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
    currencyTitle: {
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