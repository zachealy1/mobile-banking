import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const TimeSeriesGraph = () => {
    const screenWidth = Dimensions.get('window').width;

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                data: [500, 700, 800, 600, 650, 900],
                color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                strokeWidth: 2,
            },
        ],
        legend: ["Monthly Spending"],
    };

    return (
        <View style={styles.container}>
            <LineChart
                data={data}
                width={screenWidth - 32}
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
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 8,
                }}
            />
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
