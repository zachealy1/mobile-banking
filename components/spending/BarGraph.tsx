import React from 'react';
import {Dimensions, StyleSheet, ScrollView} from 'react-native';
import { vendorData } from '@/constants/Data';
import { BarChart } from "react-native-chart-kit";

const BarGraph = () => {
    const screenWidth = Dimensions.get('window').width;

    const data = {
        labels: vendorData.labels,
        datasets: [
            {
                data: vendorData.values,
            },
        ],
    };

    const chartWidth = data.labels.length * 80;

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarChart
                data={data}
                width={chartWidth}
                height={220}
                yAxisLabel="£"
                yAxisSuffix=""
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#f9f9f9",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 8,
                    },
                    propsForLabels: {
                        fontSize: 10,
                    },
                    propsForVerticalLabels: {
                        fontSize: 10,
                    },
                    propsForHorizontalLabels: {
                        fontSize: 10,
                    },
                }}
                verticalLabelRotation={0}
                style={{
                    marginVertical: 8,
                    borderRadius: 8,
                }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 16,
    },
});

export default BarGraph;
