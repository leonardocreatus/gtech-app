import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Login from "./src/views/Login";
import Transation from "./src/views/Transation";
import CameraView from "./src/views/CameraView";
import Send from "./src/views/Send";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Transation" component={Transation} />
			<Stack.Screen name="CameraView" component={CameraView} />
			<Stack.Screen name="Send" component={Send} />
		</Stack.Navigator>
	);
}
export default function App() {
	return (
		<NavigationContainer>
			<StatusBar hidden />
			<MyStack />
		</NavigationContainer>
	);
}
