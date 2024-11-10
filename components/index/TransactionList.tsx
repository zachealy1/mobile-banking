import React from 'react';
import { View, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Transaction } from '@/types/transaction';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from "react-native";

interface TransactionListProps {
    currentTransactions: Transaction[];
    transactionOpacity: Animated.Value;
    filter: 'all' | 'incoming' | 'outgoing'; // Add filter prop
}

export default function TransactionList({ currentTransactions, transactionOpacity, filter }: TransactionListProps) {
    const filteredTransactions = filter === 'incoming'
        ? currentTransactions.filter(transaction => transaction.amount.startsWith('+'))
        : filter === 'outgoing'
            ? currentTransactions.filter(transaction => !transaction.amount.startsWith('+'))
            : currentTransactions;

    return (
        <View>
            {filteredTransactions.map((transaction: Transaction, index: number) => {
                const isPositive = transaction.amount.startsWith('+');
                return (
                    <Animated.View key={index} style={[styles.transactionContainer, { opacity: transactionOpacity }]}>
                        <ThemedText type="subtitle" style={styles.transactionDate}>{transaction.date}</ThemedText>
                        <ThemedView style={styles.transactionBox}>
                            <ThemedText type="defaultSemiBold" style={styles.transactionDescription}>
                                {transaction.description}
                            </ThemedText>
                            <ThemedText
                                type="defaultSemiBold"
                                style={[
                                    styles.transactionAmount,
                                    { color: isPositive ? '#28a745' : '#007BFF' }
                                ]}
                            >
                                {transaction.amount}
                            </ThemedText>
                        </ThemedView>
                    </Animated.View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    transactionContainer: {
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    transactionBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        alignItems: 'center',
    },
    transactionDescription: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    transactionDate: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
});