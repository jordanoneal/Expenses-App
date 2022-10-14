import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

export default function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>
    if (expenses.length) {
        content = <ExpensesList expenses={expenses} />
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    },
    infoText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})