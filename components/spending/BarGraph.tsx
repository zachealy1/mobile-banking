import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
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

    return (
        <View style={styles.container}>
            <BarChart
                data={data}
                width={screenWidth - 32}
                height={280}
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
                }}
                verticalLabelRotation={30}
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

export default BarGraph;
