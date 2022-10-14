import { createContext, useContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 1,
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2021-12-19"),
    },
    {
        id: 2,
        description: "A pair of checkered-pants",
        amount: 89.29,
        date: new Date("2021-01-05"),
    },
    {
        id: 3,
        description: "Elden Ring GOTY Edition",
        amount: 89.29,
        date: new Date("2022-08-27"),
    },
    {
        id: 4,
        description: "Outwitting the Devil",
        amount: 14.99,
        date: new Date("2022-02-19"),
    },
    {
        id: 5,
        description: "Coffee",
        amount: 4.99,
        date: new Date("2022-10-12"),
    },
    {
        id: 6,
        description: "Dead or Alive DLC",
        amount: 90.99,
        date: new Date("2022-10-13"),
    },
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
};

export const ExpensesContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    const addExpense = (expenseData) => {
        dispatch({ type: "ADD", payload: expenseData });
    };

    const deleteExpense = (id) => {
        dispatch({ type: "DELETE", payload: id });
    };

    const updateExpense = (id, expenseData) => {
        dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
    };

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
};
