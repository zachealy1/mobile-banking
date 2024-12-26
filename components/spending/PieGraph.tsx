import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {spendingData} from '@/constants/Data';
import {PieChart} from "react-native-chart-kit";

const PieGraph = () => {

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
