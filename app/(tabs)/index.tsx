import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Animated, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import SwiperContainer from '@/components/Carousel';
import MenuContainer from '@/components/Menu';
import HomeTabButtonsContainer from '@/components/HomeTabButtons';
import TransactionList from '@/components/TransactionList';
import { transactionsItems, currencyFullNames, currencyItems } from '@/constants/Data';
import { currencyCode } from '@/types/currencyCode';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const transactionOpacity = useRef(new Animated.Value(1)).current;
    const currencyTitleOpacity = useRef(new Animated.Value(1)).current;

    // Memoized swiperTranslateY to avoid recalculation
    const swiperTranslateY = useMemo(() => scrollY.interpolate({
        inputRange: [0, 350],
        outputRange: [0, -350],
        extrapolate: 'clamp',
    }), [scrollY]);

    const width = Dimensions.get('window').width;

    const [currentCurrency, setCurrentCurrency] = useState<currencyCode>('GBP');
    const [currentTransactions, setCurrentTransactions] = useState(transactionsItems['GBP']);
    const [isScrolled, setIsScrolled] = useState(false);
    const [filter, setFilter] = useState<'all' | 'incoming' | 'outgoing'>('all'); // Add filter state

    const borderOpacity = useRef(new Animated.Value(0)).current;

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollOffsetY = event.nativeEvent.contentOffset.y;

        if (scrollOffsetY > 10 && !isScrolled) {
            setIsScrolled(true);

            Animated.timing(borderOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else if (scrollOffsetY <= 10 && isScrolled) {
            setIsScrolled(false);

            Animated.timing(borderOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isScrolled, borderOpacity]);

    const updateCurrentCurrency = useCallback((index: number) => {
        const selectedCurrency = currencyItems[index].value as currencyCode;
        setCurrentCurrency(selectedCurrency);
    }, []);

    const updateCurrentTransactions = useCallback((index: number) => {
        const selectedCurrency = currencyItems[index].value;
        const newTransactions = transactionsItems[selectedCurrency as keyof typeof currencyFullNames];
        setCurrentTransactions(newTransactions);
    }, []);

    const handleSnapToItem = useCallback((index: number) => {
        updateCurrentCurrency(index);
        updateCurrentTransactions(index);
    }, [updateCurrentCurrency, updateCurrentTransactions]);

    const [scrolling, setScrolling] = useState(false);

    const onSlideDrag = useCallback((_progress: number, absoluteProgress: number) => {
        setScrolling(absoluteProgress % 1 !== 0);
    }, []);

    useEffect(() => {
        if (scrolling) {
            fadeOutTransactionContainer();
        } else {
            fadeInTransactionContainer();
        }
    }, [scrolling]);

    const fadeOutTransactionContainer = useCallback(() => {
        Animated.parallel([
            Animated.timing(transactionOpacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(currencyTitleOpacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();
    }, [transactionOpacity, currencyTitleOpacity]);

    const fadeInTransactionContainer = useCallback(() => {
        Animated.parallel([
            Animated.timing(transactionOpacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(currencyTitleOpacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();
    }, [transactionOpacity, currencyTitleOpacity]);

    const handleMoneyInPress = () => {
        setFilter(prevFilter => prevFilter === 'incoming' ? 'all' : 'incoming');
    };

    const handleMoneyOutPress = () => {
        setFilter(prevFilter => prevFilter === 'outgoing' ? 'all' : 'outgoing');
    };

    return (
        <View style={styles.container}>
            <MenuContainer
                currencyTitleOpacity={currencyTitleOpacity}
                currentCurrency={currentCurrency}
                borderOpacity={borderOpacity}
            />

            <SwiperContainer
                swiperTranslateY={swiperTranslateY}
                handleSnapToItem={handleSnapToItem}
                onSlideDrag={onSlideDrag}
                scrollY={scrollY}
            />

            <Animated.ScrollView
                contentContainerStyle={styles.contentContainer}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                        listener: handleScroll
                    }
                )}
                scrollEventThrottle={10}
                showsVerticalScrollIndicator={false}
            >
                <HomeTabButtonsContainer
                    onMoneyIn={handleMoneyInPress}
                    onMoneyOut={handleMoneyOutPress} // Add a handler for "Money Out" if needed
                />

                <ThemedText type="defaultSemiBold" style={styles.transactionsHeader}>
                    Recent Transactions:
                </ThemedText>

                <TransactionList
                    currentTransactions={currentTransactions}
                    transactionOpacity={transactionOpacity}
                    filter={filter} // Pass filter state to TransactionList
                />
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginHorizontal: 2,
    },
    contentContainer: {
        flexGrow: 1,
        padding: 16,
        paddingTop: 250,  // This padding ensures content starts after the swiperContainer height
        backgroundColor: '#ffffff',
        paddingBottom: 0,
    },
    transactionsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
});