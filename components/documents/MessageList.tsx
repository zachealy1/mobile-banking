import React, { useState } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { messagesData } from "@/constants/Data"; // Assume this contains the messages data

interface MessagesListProps {
    messageOpacity: Animated.Value;
    searchTerm: string;
}

export default function MessagesList({ messageOpacity, searchTerm }: MessagesListProps) {
    const [messages, setMessages] = useState(messagesData);

    const handleMessageClick = (id: string) => {
        setMessages(prevMessages =>
            prevMessages.map(message =>
                message.id === id ? { ...message, clicked: true } : message
            )
        );
    };

    // Filter messages based on searchTerm
    const filteredMessages = messages.filter(message => {
        const matchesDate = message.date.includes(searchTerm);
        const matchesSender = message.sender.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesId = message.id.includes(searchTerm);
        const matchesContent = message.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDate || matchesSender || matchesId || matchesContent;
    });

    return (
        <View>
            {filteredMessages.map((message) => (
                <TouchableOpacity
                    key={message.id}
                    onPress={() => handleMessageClick(message.id)}
                >
                    <Animated.View style={[styles.messageContainer, { opacity: messageOpacity }]}>
                        <ThemedText type="subtitle" style={styles.messageSender}>
                            From: {message.sender}
                        </ThemedText>
                        <ThemedText type="subtitle" style={styles.messageDate}>
                            Date: {message.date}
                        </ThemedText>
                        <ThemedView style={styles.messageBox}>
                            <ThemedText type="defaultSemiBold" style={styles.messageContent}>
                                {message.content}
                            </ThemedText>
                            {!message.clicked && <View style={styles.blueDot} />}
                        </ThemedView>
                    </Animated.View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    messageContainer: {
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    messageBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        alignItems: 'center',
    },
    messageContent: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    messageDate: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    messageSender: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    blueDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007BFF',
        marginLeft: 8,
    },
});
