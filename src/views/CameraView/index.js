import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	Modal,
	Image,
} from "react-native";
import ButtonSecondary from "../../components/ButtonSecondary";
import Button from "../../components/Button.js";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import * as ImageManipulator from "expo-image-manipulator";
import { Asset } from "expo-asset";

export default function CameraView({ navigation, route }) {
	const isFocused = useIsFocused();

	const camRef = useRef(null);
	const [hasPermission, setHasPermission] = useState(null);
	const [openDrop, setOpenDrop] = useState(false);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [pictureRef, setPictureRef] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [Base64, setBase64] = useState("");

	let gate = route.params.gate;
	let camera = route.params.camera;
	let url = route.params.url;
	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const [ready, setReady] = useState(false);
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			const image = Asset.fromModule(
				require("../../../assets/images/car.jpeg")
			);
			await image.downloadAsync();
			setImage(image);
			setReady(true);
		})();
	}, []);

	if (hasPermission === null) {
		return (
			<SafeAreaView>
				<Text>NAO FOI POSSIVEL CARREGAR</Text>
			</SafeAreaView>
		);
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	function handleJoin() {
		console.log(Base64);
		fetch(url + "/img", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				camera,
				gate,
				buffer: Base64,
			}),
		});
		navigation.navigate("Send", { gate, camera, url });
	}

	// async function capturePicture() {
	// 	if (camRef) {
	// 		const data = await camRef.current.takePictureAsync();

	// 		const manipResult = await ImageManipulator.manipulateAsync(
	// 			data.uri,
	// 			[{ resize: { height: 960 } }],
	// 			{ format: "jpeg", base64: true }
	// 		);
	// 		console.log(manipResult);
	// 		setBase64(manipResult.base64);

	// 		setPictureRef(data.uri);
	// 		setOpenModal(true);
	// 	}
	// }

	async function capturePicture() {
		const manipResult = await ImageManipulator.manipulateAsync(
			image.localUri || image.uri,
			[{ resize: { height: 960 } }],
			{ format: "jpeg", base64: true }
		);
		console.log(manipResult);
		setBase64(manipResult.base64);

		setPictureRef(image.localUri || image.uri);
		setOpenModal(true);
	}

	return (
		<SafeAreaView style={styles.container}>
			{isFocused && (
				<Camera style={{ flex: 1 }} type={type} ref={camRef}></Camera>
			)}
			<TouchableOpacity style={styles.button} onPress={capturePicture}>
				<FontAwesome name="camera" size={23} color="#fff" />
			</TouchableOpacity>

			{pictureRef && (
				<Modal animationType="slide" transparent={false} visible={openModal}>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							margin: 20,
						}}
					>
						<Image
							style={{ width: "100%", height: "70%", borderRadius: 20 }}
							source={{ uri: pictureRef }}
						/>
						<View style={{ margin: 10, flexDirection: "row" }}>
							<View style={{ margin: 10, padding: 20 }}>
								<ButtonSecondary
									style={{ padding: 10 }}
									title="REPETIR"
									onPress={() => {
										setOpenModal(false);
									}}
								/>
							</View>
							{/* <TouchableOpacity
                style={{ margin: 10, padding: 20 }}
                onPress={() => {
                  setOpenModal(false);
                }}
              >
                <FontAwesome name="times-circle-o" size={50} color="tomato" />
              </TouchableOpacity> */}
							<View style={{ margin: 10, padding: 20 }}>
								<Button
									style={{ padding: 10 }}
									title="ENVIAR"
									onPress={() => {
										setOpenModal(false);
										handleJoin();
									}}
								/>
							</View>
							{/* <TouchableOpacity
                style={{ margin: 10, padding: 20 }}
                onPress={() => {
                  setOpenModal(false);
                  handleJoin();
                }}
              >
                <FontAwesome
                  name="check-circle-o"
                  size={50}
                  color="limegreen"
                />
              </TouchableOpacity> */}
						</View>
					</View>
				</Modal>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0275d8",
		margin: 20,
		borderRadius: 10,
		height: 50,
	},
});
