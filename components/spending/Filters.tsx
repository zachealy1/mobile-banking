import React, { useState } from "react";
import {StyleSheet, View} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface FiltersProps {
    onFilterChange: (filterName: keyof FiltersState, value: string) => void;
}

interface FiltersState {
    incomeOutgoings: string;
    timeScale: string;
    currency: string;
    category: string;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const [incomeOutgoingsOpen, setIncomeOutgoingsOpen] = useState(false);
    const [incomeOutgoingsValue, setIncomeOutgoingsValue] = useState("outgoing");
    const incomeOutgoingsItems = [
        { label: "Out", value: "outgoing" },
        { label: "In", value: "income" },
    ];

    const [timeScaleOpen, setTimeScaleOpen] = useState(false);
    const [timeScaleValue, setTimeScaleValue] = useState("daily");
    const timeScaleItems = [
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
        { label: "Annually", value: "annually" },
    ];

    const [currencyOpen, setCurrencyOpen] = useState(false);
    const [currencyValue, setCurrencyValue] = useState("GBP");
    const currencyItems = [
        { label: "USD", value: "USD" },
        { label: "EUR", value: "EUR" },
        { label: "GBP", value: "GBP" },
    ];

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState("all");
    const categoryItems = [
        { label: "All", value: "all" },
        { label: "Food & Dining", value: "food" },
        { label: "Shopping", value: "shopping" },
        { label: "Entertainment", value: "entertainment" },
        { label: "Transportation", value: "transportation" },
    ];

    const handleFilterUpdate = (filterName: keyof FiltersState, value: string) => {
        onFilterChange(filterName, value);
    };

    return (
        <View style={styles.filterContainer}>
            {/* Income/Outgoings Filter */}
            <DropDownPicker
                open={incomeOutgoingsOpen}
                value={incomeOutgoingsValue}
                items={incomeOutgoingsItems}
                setOpen={setIncomeOutgoingsOpen}
                setValue={(callback) => {
                    const value = typeof callback === "function" ? callback(incomeOutgoingsValue) : callback;
                    setIncomeOutgoingsValue(value);
                    handleFilterUpdate("incomeOutgoings", value);
                }}
                placeholder="Income/Outgoing"
                containerStyle={styles.dropdownContainer}
            />

            {/* Time Scale Filter */}
            <DropDownPicker
                open={timeScaleOpen}
                value={timeScaleValue}
                items={timeScaleItems}
                setOpen={setTimeScaleOpen}
                setValue={(callback) => {
                    const value = typeof callback === "function" ? callback(timeScaleValue) : callback;
                    setTimeScaleValue(value);
                    handleFilterUpdate("timeScale", value);
                }}
                placeholder="Time Scale"
                containerStyle={styles.dropdownContainer}
            />

            {/* Currency Filter */}
            <DropDownPicker
                open={currencyOpen}
                value={currencyValue}
                items={currencyItems}
                setOpen={setCurrencyOpen}
                setValue={(callback) => {
                    const value = typeof callback === "function" ? callback(currencyValue) : callback;
                    setCurrencyValue(value);
                    handleFilterUpdate("currency", value);
                }}
                placeholder="Currency"
                containerStyle={styles.dropdownContainer}
            />

            {/* Category Filter */}
            <DropDownPicker
                open={categoryOpen}
                value={categoryValue}
                items={categoryItems}
                setOpen={setCategoryOpen}
                setValue={(callback) => {
                    const value = typeof callback === "function" ? callback(categoryValue) : callback;
                    setCategoryValue(value);
                    handleFilterUpdate("category", value);
                }}
                placeholder="Category"
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
