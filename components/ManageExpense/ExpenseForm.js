import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import CustomButton from '../ui/CustomButton'
import { getFormattedDate } from '../../utils/date'
import { GlobalStyles } from '../../constants/styles'

export default function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        })
    }

    const submitHandler = () => {
        const expenseData = {
            amount: parseInt(inputs.amount.value),
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values')
            setInputs((currentInputs) => {
                return {
                    amount: { value: currentInputs.amount.value, isValid: amountIsValid },
                    date: { value: currentInputs.date.value, isValid: dateIsValid },
                    description: { value: currentInputs.description.value, isValid: descriptionIsValid },
                }
            })
            return;
        }

        onSubmit(expenseData)
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.amountDateContainer}>
                <Input style={styles.rowInput} label={'Amount'}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value,
                    }}
                    invalid={!inputs.amount.isValid}
                />
                <Input style={styles.rowInput} label={'Date'} textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value
                }}
                    invalid={!inputs.date.isValid}
                />
            </View>
            <Input label={'Description'} textInputConfig={{
                multiline: true,
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value
            }}
                invalid={!inputs.description.isValid}
            />

            {formIsInvalid && (
                <Text style={styles.errorText}>Invalid input values - please check your entered date!</Text>
            )}

            <View style={styles.buttonContainer}>
                <CustomButton style={styles.button} mode='flat' onPress={onCancel}>Cancel</CustomButton>
                <CustomButton style={styles.button} onPress={submitHandler}>{submitButtonLabel}</CustomButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    amountDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginVertical: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})