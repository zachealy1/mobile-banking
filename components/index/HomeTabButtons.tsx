import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface HomeTabButtonsContainerProps {
    onMoneyIn: () => void;
    onMoneyOut: () => void;
}

const HomeTabButtonsContainer: React.FC<HomeTabButtonsContainerProps> = ({ onMoneyIn, onMoneyOut }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onMoneyOut}>
                <ThemedText style={styles.buttonText}>Money Out</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onMoneyIn}>
                <ThemedText style={styles.buttonText}>Money In</ThemedText>
            </TouchableOpacity>
        </View>
    );
};

export default HomeTabButtonsContainer;

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 25,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        width: 165,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});