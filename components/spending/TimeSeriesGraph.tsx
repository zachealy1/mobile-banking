import React from 'react';
import { Dimensions, View, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from "react-native-chart-kit";

interface TimeSeriesGraphProps {
    data: {
        labels: string[];
        datasets: {
            data: number[];
            color?: (opacity: number) => string;
            strokeWidth?: number;
        }[];
    };
}

const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({ data }) => {
    const screenWidth = Dimensions.get('window').width;

    // Calculate dynamic width based on the number of labels
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
