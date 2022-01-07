import React, { useState } from "react";
import {
	View,
	KeyboardAvoidingView,
	StyleSheet,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	Text,
} from "react-native";
import Button from "../../components/Button.js";
import InputText from "../../components/InputText.js";
import { Gate } from "../../../out/tools/gate.js";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native-elements";
import axios from "axios";

export default function Login({ navigation }) {
	const [Ip, setIp] = useState(null);
	const [Password, setPassword] = useState(null);
	const [User, setUser] = useState(null);
	const [Error, setError] = useState("");
	async function handleJoin() {
		axios({
			method: "post",
			url: "http://" + Ip + ":4022/login",
			data: {
				user: User,
				pass: Password,
			},
		})
			.then(async (response) => {
				const gate = new Gate("http://" + Ip + ":4022");
				const data = await gate.get();
				navigation.reset({
					index: 0,
					routes: [
						{
							name: "Transation",
							params: { data, url: "http://" + Ip + ":4022" },
						},
					],
				});
			})
			.catch(function (error) {
				setError(error.message);
			});
	}
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={[styles.container, { backgroundColor: "white" }]}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.inner}>
					{/* <Text style={styles.header}>GTech</Text> */}
					<View style={{ alignItems: "center" }}>
						<Image
							source={require("../../../assets/images/gtech.jpg")}
							style={{ width: 284, height: 80 }}
						/>
					</View>
					<Text style={styles.error}>{Error}</Text>
					<InputText
						title="IP"
						onChangeText={setIp}
						icon={<MaterialIcons name="computer" size={20} color="gray" />}
					/>
					<InputText
						title="Usuário"
						onChangeText={setUser}
						icon={<MaterialIcons name="person" size={20} color="gray" />}
					/>
					<InputText
						title="Senha"
						onChangeText={setPassword}
						icon={<MaterialIcons name="lock" size={20} color="gray" />}
						secureTextEntry={true}
					/>

					<Button title="LOGAR" onPress={() => handleJoin()} />
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inner: {
		padding: 24,
		flex: 1,
		justifyContent: "space-around",
	},
	header: {
		fontSize: 36,
		marginBottom: 48,
		//fontWeight: 500,
		color: "#0275d8",
	},
	error: {
		color: "tomato",
		textAlign: "center",
	},
});
