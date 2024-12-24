import React, {useState} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {spendingData} from '@/constants/Data';
import {PieChart} from "react-native-chart-kit";

const PieGraph = () => {
    const [expanded, setExpanded] = useState(false);

    const width = Dimensions.get('window').width;

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
                <Text style={styles.expandButtonText}>{expanded ? "C" : "E"}</Text>
            </TouchableOpacity>

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

            {expanded && (
                <Modal
                    visible={expanded}
                    transparent={false}
                    animationType={'slide'}
                    onRequestClose={toggleExpand}
                >
                    <View
                        style={[styles.modalContainer, {width: Dimensions.get('window').width}, {height: Dimensions.get('window').height}]}>
                        <TouchableOpacity onPress={toggleExpand} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        <PieChart
                            data={spendingData}
                            width={Dimensions.get('window').height - 275}
                            height={Dimensions.get('window').width - 32}
                            chartConfig={{
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="0"
                            absolute
                            style={{
                                transform: [{rotate: '90deg'}],
                            }}
                        />
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    expandButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#007BFF',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        zIndex: 10,
    },
    expandButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 100,
    },
    closeButton: {
        position: 'absolute',
        bottom: 50,
        right: 10,
        transform: [{rotate: '90deg'}],
        backgroundColor: '#FF0000',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        zIndex: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default PieGraph;
