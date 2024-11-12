import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Animated, TextInput, ScrollView, TouchableOpacity, Text } from 'react-native';

import MenuContainer from "@/components/Menu";
import StatementsList from "@/components/documents/StatementList";
import MessagesList from "@/components/documents/MessageList"; // Assume MessagesList exists
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { handleAccountPress, handleChatPress } from "@/utils/eventHandlers";

// Create an Animated ScrollView component with direct access to scrollTo
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function HomeScreen() {
    const DOCUMENTS = "Documents";
    const STATEMENTS = "Statements";
    const MESSAGES = "Messages";

    const statementTitleOpacity = useRef(new Animated.Value(1)).current;
    const searchBorderOpacity = useRef(new Animated.Value(0)).current;
    const menuBorderOpacity = useRef(new Animated.Value(0)).current;
    const documentsOpacity = useRef(new Animated.Value(1)).current;
    const scrollY = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTab, setSelectedTab] = useState(STATEMENTS);

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
                title={DOCUMENTS}
                borderOpacity={menuBorderOpacity}
                onChatPress={handleChatPress}
                onAccountPress={handleAccountPress}
            />

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBox}
                    placeholder="Search by date, amount, or keywords"
                    placeholderTextColor="#999"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>

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
                        style={styles.toggleButton}
                        onPress={() => setSelectedTab(STATEMENTS)}
                    >
                        <Text style={[styles.toggleButtonText, selectedTab === STATEMENTS && styles.activeText]}>
                            Statements
                        </Text>
                        {selectedTab === STATEMENTS && <View style={styles.activeUnderline} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => setSelectedTab(MESSAGES)}
                    >
                        <Text style={[styles.toggleButtonText, selectedTab === MESSAGES && styles.activeText]}>
                            Messages
                        </Text>
                        {selectedTab === MESSAGES && <View style={styles.activeUnderline} />}
                    </TouchableOpacity>
                </View>

                {selectedTab === STATEMENTS ? (
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
        marginBottom: 15,
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
        justifyContent: 'space-around',
        marginTop: -15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    toggleButton: {
        alignItems: 'center',
        paddingVertical: 10,
        flex: 1,
    },
    toggleButtonText: {
        fontSize: 16,
        color: '#666',
    },
    activeText: {
        fontWeight: 'bold',
        color: '#333',
    },
    activeUnderline: {
        width: '100%',
        height: 2,
        backgroundColor: '#007BFF',
        position: 'absolute',
        bottom: -1,
    },
    contentContainer: {
        flexGrow: 1,
        padding: 16,
        paddingTop: 10,
        paddingBottom: -80,
        backgroundColor: '#ffffff',
    },
});
