import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import CustomButton from '../components/ui/CustomButton';
import { ExpensesContext } from '../store/expenses-context';

export default function ManageExpense() {
  const route = useRoute();
  const expenseId = route.params?.id;

  const expensesContext = useContext(ExpensesContext);

  const edit = !!expenseId;

  const navigation = useNavigation();

  const deleteExpenseHandler = () => {
    navigation.goBack();
    expensesContext.deleteExpense(expenseId);
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = () => {
    if (edit) {
      expensesContext.updateExpense(expenseId, { description: 'Test!!!!', amount: 39.99, date: new Date('2022-10-10') })
    }
    else {
      expensesContext.addExpense({ description: 'Test', amount: 19.99, date: new Date('2022-10-14') })
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
      <View style={styles.buttonContainer}>
        <CustomButton style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</CustomButton>
        <CustomButton style={styles.button} onPress={confirmHandler}>{edit ? 'Update' : 'Add'}</CustomButton>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
})