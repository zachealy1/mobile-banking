import { StyleSheet, Animated, View, Text } from "react-native";
import React, { useRef, useState } from "react";

import MenuContainer from "@/components/Menu";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import PieGraph from "@/components/spending/PieGraph";
import TimeSeriesGraph from "@/components/spending/TimeSeriesGraph";
import BarGraph from "@/components/spending/BarGraph";
import Filters from "@/components/spending/Filters";
import {
    vendorData,
    spendingDataIncome,
    spendingDataOutgoing, timeSeriesDataDaily, timeSeriesDataWeekly, timeSeriesDataMonthly, timeSeriesDataAnnually,

} from "@/constants/Data";

interface FiltersState {
    incomeOutgoings: string;
    timeScale: string;
    currency: string;
    category: string;
}

export default function SpendingScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const currencyTitleOpacity = useRef(new Animated.Value(1)).current;
    const borderOpacity = useRef(new Animated.Value(0)).current;
    const { handleScroll } = useScrollAnimation(borderOpacity);

    // State to manage filter selections
    const [filters, setFilters] = useState<FiltersState>({
        incomeOutgoings: "outgoing",
        timeScale: "daily",
        currency: "GBP",
        category: "all",
    });

    // Handle filter updates
    const handleFilterChange = (filterName: keyof FiltersState, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    // Filter spending data
    const getFilteredSpendingData = () => {
        if (filters.incomeOutgoings === "income") {
            return spendingDataIncome;
        } else if (filters.incomeOutgoings === "outgoing") {
            return spendingDataOutgoing;
        } else  {
            return spendingDataIncome;
        }
    };


    // Filter time series data
    const getFilteredTimeSeriesData = () => {
        if (filters.timeScale === "daily") {
            return timeSeriesDataDaily;
        } else if (filters.timeScale === "weekly") {
            return timeSeriesDataWeekly;
        } else if (filters.timeScale === "monthly") {
            return timeSeriesDataMonthly;
        } else if (filters.timeScale === "annually") {
            return timeSeriesDataAnnually;
        }
        // Fallback to an empty structure with the correct shape
        return {
            labels: [],
            datasets: [
                {
                    data: [],
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    strokeWidth: 2,
                },
            ],
        };
    };


    // Filter vendor data
    const getFilteredVendorData = () => {
        let baseData;

        if (filters.category === "all") {
            baseData = vendorData.all;
        } else if (filters.category === "food") {
            baseData = vendorData.food;
        } else if (filters.category === "shopping") {
            baseData = vendorData.shopping;
        } else if (filters.category === "entertainment") {
            baseData = vendorData.entertainment;
        } else {
            baseData = vendorData.transportation;
        }

        // Transform the data into the required format
        return {
            labels: baseData.labels,
            datasets: [
                {
                    data: baseData.values,
                },
            ],
        };
    };

    // Component data
    const data = [
        { id: "1", component: <Text style={styles.transactionsHeader}>Categories:</Text> },
        { id: "2", component: <PieGraph spendingData={getFilteredSpendingData()} /> },
        { id: "3", component: <Text style={styles.transactionsHeader}>Trends:</Text> },
        { id: "4", component: <TimeSeriesGraph data={getFilteredTimeSeriesData()} /> },
        { id: "5", component: <Text style={styles.transactionsHeader}>Places:</Text> },
        { id: "6", component: <BarGraph filters={filters} vendorData={getFilteredVendorData()} /> },
    ];

    return (
        <View style={styles.container}>
            <MenuContainer
                titleOpacity={currencyTitleOpacity}
                title={"Spending"}
                borderOpacity={borderOpacity}
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
                    <Filters
                        onFilterChange={handleFilterChange} // Pass filter change handler
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    contentContainer: {
        flexGrow: 1,
        padding: 16,
        paddingTop: 0,
        backgroundColor: "#ffffff",
    },
    transactionsHeader: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 0,
    },
});
