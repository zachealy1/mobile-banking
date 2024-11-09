import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Animated, TextInput, ScrollView, TouchableOpacity, Text } from 'react-native';

import MenuContainer from "@/components/Menu";
import StatementsList from "@/components/StatementList";
import MessagesList from "@/components/MessageList"; // Assume MessagesList exists
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { handleAccountPress, handleChatPress } from "@/utils/eventHandlers";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function HomeScreen() {
    const statementTitleOpacity = useRef(new Animated.Value(1)).current;
    const searchBorderOpacity = useRef(new Animated.Value(0)).current;
    const menuBorderOpacity = useRef(new Animated.Value(0)).current;
    const documentsOpacity = useRef(new Animated.Value(1)).current;
    const scrollY = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTab, setSelectedTab] = useState('Statements');

    const { handleScroll } = useScrollAnimation(searchBorderOpacity);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    }, [searchTerm]);

    return (
        <View style={styles.container}>
            <MenuContainer
                titleOpacity={statementTitleOpacity}
                title={"Statements"}
                borderOpacity={menuBorderOpacity}
                onChatPress={handleAccountPress}
                onAccountPress={handleChatPress}
            />

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBox}
                    placeholder="Search by date, currency, or ID"
                    placeholderTextColor="#999"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>

            {/* Animated border aligned with the bottom of searchContainer */}
            <Animated.View style={[styles.animatedBorder, { opacity: searchBorderOpacity }]} />

            <AnimatedScrollView
                ref={scrollViewRef}
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
                <View style={styles.toggleMenu}>
                    <TouchableOpacity
                        style={[styles.toggleButton, selectedTab === 'Statements' && styles.activeButton]}
                        onPress={() => setSelectedTab('Statements')}
                    >
                        <Text style={styles.toggleButtonText}>Statements</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, selectedTab === 'Messages' && styles.activeButton]}
                        onPress={() => setSelectedTab('Messages')}
                    >
                        <Text style={styles.toggleButtonText}>Messages</Text>
                    </TouchableOpacity>
                </View>
                {selectedTab === 'Statements' ? (
                    <StatementsList
                        statementOpacity={documentsOpacity}
                        searchTerm={searchTerm}
                    />
                ) : (
                    <MessagesList searchTerm={searchTerm} messageOpacity={documentsOpacity} />
                )}
            </AnimatedScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    searchContainer: {
        paddingTop: 110,
        marginBottom: 10,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
    },
    searchBox: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: '#f5f5f5',
        color: '#333',
        fontSize: 16,
    },
    animatedBorder: {
        height: 1,
        backgroundColor: '#ccc',
    },
    toggleMenu: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 15,
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
    },
    activeButton: {
        backgroundColor: '#007BFF',
    },
    toggleButtonText: {
        color: '#333',
        fontSize: 16,
    },
    contentContainer: {
        flexGrow: 1,
        padding: 16,
        paddingTop: 10,
        backgroundColor: '#ffffff',
    },
});
