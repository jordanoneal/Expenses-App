import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../utils/date';

export default function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7)

    return (expense.date >= date7DaysAgo) && (expense.date <= today);
  })

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod={'Last 7 Days'} fallbackText={'No Expenses'} />
  )
}