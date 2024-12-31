import React, {useMemo, useRef} from "react";
import {Animated, StyleSheet, View, FlatList, TouchableOpacity, Text} from "react-native";
import { handleAccountPress, handleChatPress } from "@/utils/eventHandlers";
import MenuContainer from "@/components/Menu";
import { ThemedText } from "@/components/ThemedText";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CurrencySelector from "@/components/pay/CurrencySelector";
import SendReceive from "@/components/pay/SendReceive";
import QuickSendReceive from "@/components/pay/QuickSendReceive";

const users = [
    { id: "1", name: "Hannah Chen", avatarColor: "#2F80ED" },
    { id: "2", name: "Adam Miller Jr", avatarColor: "#F2C94C" },
    { id: "3", name: "Emily Davis", avatarColor: "#EB5757" },
    { id: "4", name: "Michael Smith", avatarColor: "#27AE60" },
    { id: "5", name: "Sophia Johnson", avatarColor: "#9B51E0" },
    { id: "6", name: "James Brown", avatarColor: "#56CCF2" },
    { id: "7", name: "Olivia Taylor", avatarColor: "#FFA726" },
    { id: "8", name: "Liam Wilson", avatarColor: "#2196F3" },
    { id: "9", name: "Ava Martinez", avatarColor: "#FF4081" },
];

const dataWithAddCard = [{ id: "ADD_CARD" }, ...users];

export default function PayScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const currencyTitleOpacity = useRef(new Animated.Value(1)).current;
    const borderOpacity = useRef(new Animated.Value(0)).current;
    const { handleScroll } = useScrollAnimation(borderOpacity);

    useMemo(
        () =>
            scrollY.interpolate({
                inputRange: [0, 350],
                outputRange: [0, -350],
                extrapolate: "clamp",
            }),
        [scrollY]
    );

    const renderItem = ({
                            item,
                        }: {
        item: { id: string; name?: string; avatarColor?: string };
    }) => {
        if (item.id === "ADD_CARD") {
            return (
                <TouchableOpacity style={styles.addCard}>
                    <Text style={styles.addCardText}>+</Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={[styles.userCard, { backgroundColor: item.avatarColor }]}>
                <Text style={styles.userName}>{item.name}</Text>
            </View>
        );
    };

    const handleQuickSend = () => {
        console.log("Quick Send");
    };

    const handleQuickReceive = () => {
        console.log("Quick Receive");
    };

    return (
        <View style={styles.container}>
            <MenuContainer
                titleOpacity={currencyTitleOpacity}
                title={"Pay"}
                borderOpacity={borderOpacity}
                onChatPress={handleChatPress}
                onAccountPress={handleAccountPress}
            />

            <Animated.ScrollView
                contentContainerStyle={styles.contentContainer}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                        listener: handleScroll,
                    }
                )}
                scrollEventThrottle={10}
                showsVerticalScrollIndicator={false}
            >

                <ThemedText type="defaultSemiBold" style={styles.balanceHeader}>
                    Balance
                </ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.balanceAmount}>
                    £ 150.89
                </ThemedText>

                <View style={styles.menuContainer}>
                    <FlatList
                        data={dataWithAddCard}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.userList}
                    />
                </View>

                <CurrencySelector/>

                <QuickSendReceive
                    onQuickSend={handleQuickSend}
                    onQuickReceive={handleQuickReceive}
                />

                <SendReceive mode={"send"} recipientName={"Hannah"}/>

                <SendReceive mode={"receive"} recipientName={"Hannah"}/>

            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    contentContainer: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        paddingBottom: 0,
    },
    balanceHeader: {
        fontSize: 24,
        paddingTop: 110,
        paddingLeft: 265,
        fontWeight: "bold",
        color: "#000",
    },
    balanceAmount: {
        fontSize: 34,
        paddingTop: 8,
        paddingLeft: 228,
        fontWeight: "bold",
        color: "#000",
    },
    menuContainer: {
        flexDirection: "row",
        marginTop: 12,
        alignItems: "center",
    },
    userList: {
        flexDirection: "row",
        paddingLeft: 20,
    },
    addCard: {
        width: 80,
        height: 120,
        borderWidth: 2,
        borderColor: "#BDBDBD",
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
        backgroundColor: "transparent",
        opacity: 0.7,
        borderRadius: 10,
    },
    addCardText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#BDBDBD",
    },
    userCard: {
        width: 80,
        height: 120,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    userName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
});
