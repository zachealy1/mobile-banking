import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ThemedText} from "@/components/ThemedText";

interface QuickSendReceiveButtonsProps {
    onQuickSend: () => void;
    onQuickReceive: () => void;
}

const QuickSendReceive: React.FC<QuickSendReceiveButtonsProps> = ({ onQuickSend, onQuickReceive }) => {

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onQuickSend}>
                <ThemedText style={styles.buttonText}>Quick Send</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onQuickReceive}>
                <ThemedText style={styles.buttonText}>Quick Receive</ThemedText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 24,
        marginHorizontal: 12,
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

export default QuickSendReceive;
