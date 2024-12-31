import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CurrencySelector = () => {

    return (
        <TouchableOpacity style={styles.cardRow} onPress={() => console.log('Card Row pressed!')}>
            <View style={styles.cardIcon} />
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>GBP</Text>
                <Text style={styles.cardSubtitle}>Great British Pounds • 35455468</Text>
            </View>
            <Text style={styles.cardArrow}>›</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 24,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    cardIcon: {
        width: 40,
        height: 32,
        borderRadius: 8,
        backgroundColor: "#2F80ED",
        marginRight: 12,
    },
    cardTextContainer: {
        flex: 1,
        justifyContent: "center",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 2,
    },
    cardSubtitle: {
        fontSize: 14,
        color: "#888",
    },
    cardArrow: {
        fontSize: 24,
        color: "#ccc",
        marginLeft: 8,
    },
});

export default CurrencySelector;
