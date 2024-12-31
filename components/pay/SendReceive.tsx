import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

interface SendReceiveProps {
    mode: "send" | "receive";
    onPressNextStep?: (amount: number) => void;
    recipientName?: string;
}

const SendReceive: React.FC<SendReceiveProps> = ({ mode, onPressNextStep, recipientName }) => {

    const [selectedAmount, setSelectedAmount] = useState<number>(100);
    const [description, setDescription] = useState<string>("");

    const quickAmounts = [25, 50, 100, 200];

    const isSend = mode === "send";
    const titleText = isSend ? "Send" : "Receive";
    const subTitleText = isSend
        ? `Send money to ${recipientName}`
        : `Request money from ${recipientName}`;
    const buttonText = isSend ? "Send →" : "Receive →";

    const handleNextStep = () => {
        onPressNextStep?.(selectedAmount);
        console.log(`${titleText} Next Step pressed`, selectedAmount, description);
    };

    return (
        <View style={styles.container}>
            <View style={styles.amountHeaderRow}>
                <Text style={styles.amountTitle}>{titleText}</Text>
                <Text style={styles.amountRecipient}>{subTitleText}</Text>
            </View>

            <View style={styles.amountInputRow}>
                <Text style={styles.amountInputText}>{`£ ${selectedAmount}`}</Text>
                <Text style={styles.dropDownArrow}>⌄</Text>
            </View>

            <View style={styles.quickAmountsRow}>
                {quickAmounts.map((amt) => {
                    const isSelected = amt === selectedAmount;
                    return (
                        <TouchableOpacity
                            key={amt}
                            style={[styles.quickAmountButton, isSelected && styles.quickAmountSelected]}
                            onPress={() => setSelectedAmount(amt)}
                        >
                            <Text
                                style={[
                                    styles.quickAmountText,
                                    isSelected && styles.quickAmountTextSelected,
                                ]}
                            >
                                {`£ ${amt}`}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TextInput
                style={styles.descriptionInput}
                placeholder="Description (Optional)"
                placeholderTextColor="#999"
                onChangeText={setDescription}
                value={description}
            />

            <TouchableOpacity style={styles.nextStepButton} onPress={handleNextStep}>
                <Text style={styles.nextStepButtonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 24,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    amountHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    amountTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    amountRecipient: {
        fontSize: 14,
        color: "#2F80ED",
    },
    amountInputRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 14,
        marginBottom: 16,
    },
    amountInputText: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    dropDownArrow: {
        fontSize: 18,
        color: "#888",
        marginLeft: 8,
    },
    quickAmountsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    quickAmountButton: {
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: "#F2F2F2",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    quickAmountSelected: {
        backgroundColor: "#2F80ED",
    },
    quickAmountText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    quickAmountTextSelected: {
        color: "#fff",
    },
    descriptionInput: {
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        fontSize: 16,
        color: "#333",
        marginBottom: 16,
    },
    nextStepButton: {
        backgroundColor: "#2F80ED",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
    },
    nextStepButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});

export default SendReceive;
