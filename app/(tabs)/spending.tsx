import {StyleSheet, Animated, View, Text} from 'react-native';

import MenuContainer from "@/components/Menu";
import {handleAccountPress, handleChatPress} from "@/utils/eventHandlers";
import React, { useRef } from "react";
import {useScrollAnimation} from "@/hooks/useScrollAnimation";
import PieGraph from "@/components/spending/PieGraph";
import TimeSeriesGraph from "@/components/spending/TimeSeriesGraph";
import BarGraph from "@/components/spending/BarGraph";
import Filters from "@/components/spending/Filters";

export default function SpendingScreen() {

    const scrollY = useRef(new Animated.Value(0)).current;
    const currencyTitleOpacity = useRef(new Animated.Value(1)).current;

    const borderOpacity = useRef(new Animated.Value(0)).current;

    const {handleScroll} = useScrollAnimation(borderOpacity);

    const data = [
        { id: "1", component: <Text style={styles.transactionsHeader}>Categories:</Text> },
        { id: "2", component: <PieGraph /> },
        { id: "3", component: <Text style={styles.transactionsHeader}>Trends:</Text> },
        { id: "4", component: <TimeSeriesGraph /> },
        { id: "5", component: <Text style={styles.transactionsHeader}>Places:</Text> },
        { id: "6", component: <BarGraph /> },
    ];

    return (
        <View style={styles.container}>
            <MenuContainer
                titleOpacity={currencyTitleOpacity}
                title={"Spending"}
                borderOpacity={borderOpacity}
                onChatPress={handleChatPress}
                onAccountPress={handleAccountPress}
            />

            <Animated.FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <View>{item.component}</View>}
                contentContainerStyle={styles.contentContainer}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true, listener: handleScroll }
                )}
                scrollEventThrottle={10}
                showsVerticalScrollIndicator={false}
                ListHeaderComponentStyle={{ zIndex: 1 }}
                ListHeaderComponent={
                    <Filters />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        flexGrow: 1,
        padding: 16,
        paddingTop: 0,
        backgroundColor: '#ffffff',
    },
    transactionsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 0,
    },
});
