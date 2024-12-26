import React from 'react';
import { Dimensions, View, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const TimeSeriesGraph = () => {
    const screenWidth = Dimensions.get('window').width;

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: [500, 700, 800, 600, 650, 900, 750, 820, 880, 920, 1000, 1100],
                color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    };

    const chartWidth = data.labels.length * 80;

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                    data={data}
                    width={chartWidth}
                    height={220}
                    chartConfig={{
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: "#f9f9f9",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 8,
                        },
                        propsForDots: {
                            r: "4",
                            strokeWidth: "2",
                            stroke: "#ffa726",
                        },
                        propsForLabels: {
                            fontSize: 10,
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 8,
                    }}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 16,
    },
});

export default TimeSeriesGraph;
