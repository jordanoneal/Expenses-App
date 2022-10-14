import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import ExpenseItem from './ExpenseItem'

export default function ExpensesList({ expenses }) {
    const renderExpenseItem = (itemData) => {
        return (
            <ExpenseItem {...itemData.item} />
        )
    }

    return (
        <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id}>
        </FlatList>
    )
}