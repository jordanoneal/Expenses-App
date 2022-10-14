import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'

export default function AllExpenses() {
    const expensesContext = useContext(ExpensesContext);

    return (
        <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod={'Total'} fallbackText={'No Expenses'} />
    )
}   