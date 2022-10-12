import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: '#fff',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500
    }}>
      <Tab.Screen name='RecentExpenses' component={RecentExpenses} options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' color={color} size={size} />
      }}></Tab.Screen>
      <Tab.Screen name='AllExpenses' component={AllExpenses} options={{
        title: 'All',
        tabBarIcon: ({ color, size }) => <Ionicons name='cash-outline' color={color} size={size} />
      }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{
            title: 'Expenses Overview',
            headerShown: false
          }}></Stack.Screen>
          <Stack.Screen name='ManageExpense' component={ManageExpense}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}