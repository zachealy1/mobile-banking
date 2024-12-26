import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Filters: React.FC = () => {
    const [incomeOutgoingsOpen, setIncomeOutgoingsOpen] = useState(false);
    const [incomeOutgoingsValue, setIncomeOutgoingsValue] = useState("income");
    const [incomeOutgoingsItems, setIncomeOutgoingsItems] = useState([
        { label: "Income", value: "income" },
        { label: "Outgoings", value: "outgoings" },
        { label: "Monthly", value: "monthly" },
        { label: "Annually", value: "annually" },
    ]);

    const [timeScaleOpen, setTimeScaleOpen] = useState(false);
    const [timeScaleValue, setTimeScaleValue] = useState("daily");
    const [timeScaleItems, setTimeScaleItems] = useState([
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
        { label: "Annually", value: "annually" },
    ]);

    const [currencyOpen, setCurrencyOpen] = useState(false);
    const [currencyValue, setCurrencyValue] = useState("GBP");
    const [currencyItems, setCurrencyItems] = useState([
        { label: "USD", value: "USD" },
        { label: "EUR", value: "EUR" },
        { label: "GBP", value: "GBP" },
    ]);

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState("all");
    const [categoryItems, setCategoryItems] = useState([
        { label: "All", value: "all" },
        { label: "Food & Dining", value: "food" },
        { label: "Shopping", value: "shopping" },
        { label: "Entertainment", value: "entertainment" },
        { label: "Transportation", value: "transportation" },
    ]);

    return (
        <View style={styles.filterContainer}>
            {/* Income/Outgoings Filter */}
            <DropDownPicker
                open={incomeOutgoingsOpen}
                value={incomeOutgoingsValue}
                items={incomeOutgoingsItems}
                setOpen={setIncomeOutgoingsOpen}
                setValue={setIncomeOutgoingsValue}
                setItems={setIncomeOutgoingsItems}
                placeholder="Select Time Scale"
                containerStyle={styles.dropdownContainer}
            />

            {/* Time Scale Filter */}
            <DropDownPicker
                open={timeScaleOpen}
                value={timeScaleValue}
                items={timeScaleItems}
                setOpen={setTimeScaleOpen}
                setValue={setTimeScaleValue}
                setItems={setTimeScaleItems}
                placeholder="Select Time Scale"
                containerStyle={styles.dropdownContainer}
            />

            {/* Currency Filter */}
            <DropDownPicker
                open={currencyOpen}
                value={currencyValue}
                items={currencyItems}
                setOpen={setCurrencyOpen}
                setValue={setCurrencyValue}
                setItems={setCurrencyItems}
                placeholder="Select Currency"
                containerStyle={styles.dropdownContainer}
            />

            {/* Category Filter */}
            <DropDownPicker
                open={categoryOpen}
                value={categoryValue}
                items={categoryItems}
                setOpen={setCategoryOpen}
                setValue={setCategoryValue}
                setItems={setCategoryItems}
                placeholder="Select Category"
                containerStyle={styles.dropdownContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 110,
        marginBottom: 15,
        marginHorizontal: 5,
    },
    dropdownContainer: {
        width: "23%",
    },
});

export default Filters;
