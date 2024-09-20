import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Animated, Dimensions} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Carousel from 'react-native-reanimated-carousel';

export default function HomeScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;

    // Animate the translateY to move the swiper up as the user scrolls
    const swiperTranslateY = scrollY.interpolate({
        inputRange: [0, 350], // Adjust based on your swiper height
        outputRange: [0, -350], // Moves the swiper up
        extrapolate: 'clamp', // Prevent values outside the defined range
    });

    const width = Dimensions.get('window').width;

    const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('GBP');
    const [currentTransactions, setCurrentTransactions] = useState(transactionsItems['GBP']);

    const [isScrolled, setIsScrolled] = useState(false);

    // Border opacity tracking
    const borderOpacity = useRef(new Animated.Value(0)).current;

    const handleScroll = (event: any) => {
        const scrollOffsetY = event.nativeEvent.contentOffset.y;

        if (scrollOffsetY > 10 && !isScrolled) {
            setIsScrolled(true);  // Set scrolled when user scrolls down

            // Fade in the border
            Animated.timing(borderOpacity, {
                toValue: 1,  // Fully visible
                duration: 300,  // Animation duration
                useNativeDriver: true,  // Use native driver for better performance
            }).start();
        } else if (scrollOffsetY <= 10 && isScrolled) {
            setIsScrolled(false);  // Remove the border when back at the top

            // Fade out the border
            Animated.timing(borderOpacity, {
                toValue: 0,  // Fully transparent
                duration: 300,  // Animation duration
                useNativeDriver: true,  // Use native driver for better performance
            }).start();
        }
    };

    function updateCurrentCurrency(index: number) {
        const selectedCurrency = currencyItems[index].value as CurrencyCode;
        setCurrentCurrency(selectedCurrency);
    }

    function updateCurrentTransactions(index: number) {
        const selectedCurrency = currencyItems[index].value;
        const newTransactions = transactionsItems[selectedCurrency];
        setCurrentTransactions(newTransactions);
    }

    const handleSnapToItem = (index: number) => {
        updateCurrentCurrency(index);
        updateCurrentTransactions(index);
    };


    return (
        <View style={styles.container}>
            {/* Chat and accounts buttons */}
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuButton}>
                    <ThemedText style={styles.buttonText}>C</ThemedText>
                </TouchableOpacity>
                <ThemedText type={"subtitle"} style={styles.currencyTitle}>
                    {currentCurrency} - {currencyFullNames[currentCurrency]}
                </ThemedText>
                <TouchableOpacity style={styles.menuButton}>
                    <ThemedText style={styles.buttonText}>A</ThemedText>
                </TouchableOpacity>

                {/* Animated border */}
                <Animated.View style={[styles.animatedBorder, { opacity: borderOpacity }]} />
            </View>

            {/* Scrollable content */}
            <Animated.View style={[styles.swiperContainer, { transform: [{ translateY: swiperTranslateY }] }]}>
                <Carousel
                    loop={false}
                    width={width}
                    height={width / 2}
                    autoPlay={false}
                    data={currencyItems}
                    scrollAnimationDuration={500}
                    mode="parallax"
                    vertical={false}
                    pagingEnabled={true}
                    snapEnabled={true}
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 80,
                    }}
                    onSnapToItem={handleSnapToItem}
                    renderItem={({ item }) => (
                        <View style={styles.swiper}>
                            <View style={styles.slide}>
                                <ThemedText style={styles.slideText}>
                                    {item.symbol}
                                </ThemedText>
                            </View>
                        </View>
                    )}
                />
            </Animated.View>

            {/* Scrollable content */}
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
                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <ThemedText style={styles.buttonText}>Money Out</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <ThemedText style={styles.buttonText}>Money In</ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Recent Transactions Header */}
                <ThemedText type="defaultSemiBold" style={styles.transactionsHeader}>
                    Recent Transactions:
                </ThemedText>

                {/* Transaction List */}
                {currentTransactions.map((transaction, index) => {
                    const isPositive = transaction.amount.startsWith('+');
                    return (
                        <ThemedView key={index} style={styles.transactionContainer}>
                            <ThemedText type="subtitle" style={styles.transactionDate}>{transaction.date}</ThemedText>
                            <ThemedView style={styles.transactionBox}>
                                <ThemedText type="defaultSemiBold" style={styles.transactionDescription}>
                                    {transaction.description}
                                </ThemedText>
                                <ThemedText
                                    type="defaultSemiBold"
                                    style={[
                                        styles.transactionAmount,
                                        { color: isPositive ? '#28a745' : '#007BFF' }
                                    ]}
                                >
                                    {transaction.amount}
                                </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    );
                })}
            </Animated.ScrollView>
        </View>
    );
}

type Transaction = {
    date: string;
    description: string;
    amount: string;
};

type TransactionsItems = {
    [key: string]: Transaction[];
};

const transactionsItems: TransactionsItems = {
    'GBP': [
        { date: "9 September 2024", description: "Sainsbury's", amount: "£5.00" },
        { date: "8 September 2024", description: "Lloyd's Bank", amount: "+ £5.00" },
        { date: "7 September 2024", description: "Tesco", amount: "£20.00" },
        { date: "6 September 2024", description: "Starbucks", amount: "£4.50" },
        { date: "5 September 2024", description: "Amazon Purchase", amount: "£12.99" },
        { date: "4 September 2024", description: "Train Ticket", amount: "£15.00" },
        { date: "3 September 2024", description: "John Lewis", amount: "£50.00" },
        { date: "2 September 2024", description: "Uber Eats", amount: "£25.00" },
        { date: "1 September 2024", description: "Gym Membership", amount: "£35.00" },
        { date: "31 August 2024", description: "Waitrose", amount: "£60.00" },
        { date: "30 August 2024", description: "Amazon Prime", amount: "£7.99" },
        { date: "29 August 2024", description: "Spotify Subscription", amount: "£9.99" },
        { date: "28 August 2024", description: "Netflix", amount: "£10.99" },
        { date: "27 August 2024", description: "BT Broadband", amount: "£30.00" },
        { date: "26 August 2024", description: "ASDA", amount: "£20.50" },
    ],
    'EUR': [
        { date: "9 September 2024", description: "Lidl", amount: "€15.00" },
        { date: "8 September 2024", description: "Rewe", amount: "+ €20.00" },
        { date: "7 September 2024", description: "Aldi", amount: "€8.00" },
        { date: "6 September 2024", description: "Edeka", amount: "€12.50" },
        { date: "5 September 2024", description: "IKEA", amount: "€60.00" },
        { date: "4 September 2024", description: "Gas Station", amount: "€45.00" },
        { date: "3 September 2024", description: "MediaMarkt", amount: "€110.00" },
        { date: "2 September 2024", description: "DM Drogerie", amount: "€20.00" },
        { date: "1 September 2024", description: "Burger King", amount: "€15.50" },
        { date: "31 August 2024", description: "Deutsche Bahn", amount: "€25.00" },
        { date: "30 August 2024", description: "Zalando", amount: "€80.00" },
        { date: "29 August 2024", description: "Amazon DE", amount: "€35.99" },
        { date: "28 August 2024", description: "McFit Gym", amount: "€20.00" },
        { date: "27 August 2024", description: "Telekom", amount: "€40.00" },
        { date: "26 August 2024", description: "Euronics", amount: "€95.00" },
    ],
    'USD': [
        { date: "9 September 2024", description: "Walmart", amount: "$10.00" },
        { date: "8 September 2024", description: "Bank of America", amount: "+ $50.00" },
        { date: "7 September 2024", description: "Starbucks", amount: "$5.00" },
        { date: "6 September 2024", description: "Amazon Purchase", amount: "$25.00" },
        { date: "5 September 2024", description: "Uber", amount: "$12.00" },
        { date: "4 September 2024", description: "McDonald's", amount: "$8.99" },
        { date: "3 September 2024", description: "Target", amount: "$30.00" },
        { date: "2 September 2024", description: "Whole Foods", amount: "$45.00" },
        { date: "1 September 2024", description: "Netflix", amount: "$13.99" },
        { date: "31 August 2024", description: "Costco", amount: "$75.00" },
        { date: "30 August 2024", description: "Apple Store", amount: "$120.00" },
        { date: "29 August 2024", description: "Hulu", amount: "$11.99" },
        { date: "28 August 2024", description: "Walmart", amount: "$25.00" },
        { date: "27 August 2024", description: "Sprint", amount: "$50.00" },
        { date: "26 August 2024", description: "Best Buy", amount: "$200.00" },
    ],
};

const currencyItems: { symbol: string, value: string }[] = [
    { symbol: '£21.22', value: 'GBP' },
    { symbol: '€30.46', value: 'EUR' },
    { symbol: '$40.12', value: 'USD' },
];

type CurrencyCode = 'GBP' | 'EUR' | 'USD';

const currencyFullNames: Record<CurrencyCode, string> = {
    'GBP': 'Great British Pounds',
    'EUR': 'Euros',
    'USD': 'US Dollars',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginHorizontal: 2,
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 120,  // Increase the height to include the status bar area
        zIndex: 2,
        backgroundColor: '#ffffff',
        paddingTop: 60,  // Add padding to account for the status bar (adjust if needed)
    },
    animatedBorder: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#ccc',  // The border color
    },
    menuButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    currencyTitle: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        flex: 1,
    },
    swiperContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 180,
        marginTop: 80,
        marginBottom: 180,
        zIndex: 1,
    },
    swiper: {
        height: 190,
        marginBottom: 12,
        marginTop: 8,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        marginHorizontal: 20,
        marginVertical: 28,
        padding: 8,
        overflow: 'hidden',
    },
    slideText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        width: '90%',
        lineHeight: 40,
    },
    contentContainer: {
        flexGrow: 1,
        padding: 16,
        paddingTop: 250,  // This padding ensures content starts after the swiperContainer height
        backgroundColor: '#ffffff',
        paddingBottom: 0,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        width: 165,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    transactionsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
    transactionContainer: {
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    transactionBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        alignItems: 'center',
    },
    transactionDescription: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    transactionDate: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
});