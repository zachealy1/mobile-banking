import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from "react-native-chart-kit";

interface PieGraphProps {
    spendingData: {
        name: string;
        population: number;
        color: string;
        legendFontColor: string;
        legendFontSize: number;
    }[];
}

const PieGraph: React.FC<PieGraphProps> = ({ spendingData }) => {
    const width = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <PieChart
                data={spendingData}
                width={width - 32}
                height={220}
                chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
                absolute
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

export default PieGraph;
