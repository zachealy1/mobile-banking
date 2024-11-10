import React, { useState } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { statementsData } from "@/constants/Data";

interface StatementsListProps {
    statementOpacity: Animated.Value;
    searchTerm: string; // Add searchTerm prop
}

export default function StatementsList({ statementOpacity, searchTerm }: StatementsListProps) {
    const [statements, setStatements] = useState(statementsData);

    const handleStatementClick = (id: string) => {
        setStatements(prevStatements =>
            prevStatements.map(statement =>
                statement.id === id ? { ...statement, clicked: true } : statement
            )
        );
    };

    // Filter statements based on searchTerm
    const filteredStatements = statements.filter(statement => {
        const matchesDate = statement.date.includes(searchTerm);
        const matchesCurrency = statement.currency.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesId = statement.id.includes(searchTerm);
        const matchesDescription = statement.description.includes(searchTerm);
        return matchesDate || matchesCurrency || matchesId || matchesDescription;
    });

    return (
        <View>
            {filteredStatements.map((statement) => (
                <TouchableOpacity
                    key={statement.id}
                    onPress={() => handleStatementClick(statement.id)}
                >
                    <Animated.View style={[styles.statementContainer, { opacity: statementOpacity }]}>
                        <ThemedText type="subtitle" style={styles.statementId}>
                            ID: {statement.id}
                        </ThemedText>
                        <ThemedText type="subtitle" style={styles.statementDate}>
                            {statement.date}
                        </ThemedText>
                        <ThemedView style={styles.statementBox}>
                            <ThemedText type="defaultSemiBold" style={styles.statementDescription}>
                                {statement.description} ({statement.currency})
                            </ThemedText>
                            {!statement.clicked && <View style={styles.blueDot} />}
                        </ThemedView>
                    </Animated.View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    statementContainer: {
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
    statementBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        alignItems: 'center',
    },
    statementDescription: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    statementDate: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    statementId: {
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
