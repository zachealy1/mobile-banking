import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, TextInput } from 'react-native';

import MenuContainer from "@/components/Menu";
import StatementsList from "@/components/StatementList";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { handleAccountPress, handleChatPress } from "@/utils/eventHandlers";

export default function HomeScreen() {
    const statementTitleOpacity = useRef(new Animated.Value(1)).current;
    const searchBorderOpacity = useRef(new Animated.Value(1)).current;
    const menuBorderOpacity = useRef(new Animated.Value(0)).current;
    const statementOpacity = useRef(new Animated.Value(1)).current;
    const scrollY = useRef(new Animated.Value(0)).current;
    const [searchTerm, setSearchTerm] = useState('');

    const { handleScroll } = useScrollAnimation(searchBorderOpacity);

    return (
        <View style={styles.container}>
            {/* Menu Container */}
            <MenuContainer
                titleOpacity={statementTitleOpacity}
                title={"Statements"}
                borderOpacity={menuBorderOpacity}
                onChatPress={handleChatPress}
                onAccountPress={handleAccountPress}
            />

            <View style={styles.searchContainer}>
                {/* Search Box Below Menu Container */}
                <TextInput
                    style={styles.searchBox}
                    placeholder="Search by date, currency, or ID"
                    placeholderTextColor="#999"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />

                {/* Animated border */}
                <Animated.View style={[styles.animatedBorder, { opacity: searchBorderOpacity }]} />
            </View>

            <Animated.ScrollView
                contentContainerStyle={styles.contentContainer}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                        listener: handleScroll
                    }
                )}
                scrollEventThrottle={10}
                showsVerticalScrollIndicator={false}
            >
                <StatementsList
                    statementOpacity={statementOpacity}
                    searchTerm={searchTerm}
                />
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    searchContainer: {
        flex: 1,
        marginBottom: 170,
        position: 'relative',
        backgroundColor: '#ffffff',
    },
    searchBox: {
        height: 40,
        borderColor: '#ddd', // Light border color for subtlety
        borderWidth: 1,
        borderRadius: 12, // Increased border radius for softer look
        marginTop: 110,
        paddingHorizontal: 12,
        marginHorizontal: 16,
        marginVertical: 15, // Consistent spacing
        backgroundColor: '#f5f5f5', // Light background to blend with the page
        color: '#333', // Text color for readability
        fontSize: 16, // Slightly larger font for consistency with other text
    },
    animatedBorder: {
        position: 'absolute',
        top: 169,
        left: 0,
        right: 0,
        height: 1,
        zIndex: 1,
        backgroundColor: '#ccc',  // Border color
    },
    contentContainer: {
        flexGrow: 1,
        padding: 16,
        paddingTop: 10,
        backgroundColor: '#ffffff',
    },
});
