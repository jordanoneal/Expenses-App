import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import CustomButton from '../components/ui/CustomButton';
import { ExpensesContext } from '../store/expenses-context';
import { TextInput } from 'react-native-gesture-handler';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

export default function ManageExpense() {
  const route = useRoute();
  const expenseId = route.params?.id;

  const expensesContext = useContext(ExpensesContext);

  const edit = !!expenseId;

  const selectedExpense = expensesContext.expenses.find((expense) => expense.id === expenseId)

  const navigation = useNavigation();

  const deleteExpenseHandler = () => {
    navigation.goBack();
    expensesContext.deleteExpense(expenseId);
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = (expenseData) => {
    if (edit) {
      expensesContext.updateExpense(expenseId, expenseData)
    }
    else {
      expensesContext.addExpense(expenseData)
    }
    navigation.goBack();
  }

  useEffect(() => {
    navigation.setOptions({
      title: edit ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, edit])

  return (
    <View style={styles.container}>
      <ExpenseForm submitButtonLabel={edit ? 'Update' : 'Add'} onCancel={cancelHandler} onSubmit={confirmHandler} defaultValues={selectedExpense} />
      {edit && (
        <View style={styles.deleteContainer}>
          <IconButton icon={'trash'} size={36} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
})