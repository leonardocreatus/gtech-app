import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "../../components/Button.js";

export default function Transation({ navigation, route }) {
  const [Gates, setGates] = useState([]);
  const [cGates, setcGates] = useState("");
  const [Cameras, setCameras] = useState([]);
  const [cCameras, setcCameras] = useState("");
  let gates = new Array();
  let cameras = new Array();
  let ia;
  let ca;
  let url = route.params.url;
  route.params.data.forEach((gate, i) => {
    if (i === 0) {
      ia = gate.id;
      ca = gate.cameras[0].host;
    }
    gates.push(gate);
    //cameras.push(gate.id);
    for (let i of gate.cameras) {
      cameras.push({
        id: gate.id,
        cam: i
      });
    }
  });

  useEffect(() => {
    setGates(gates);
    setCameras(cameras);
    setcGates(ia);
    setcCameras(ca);
  }, []);

  let temp;
  useEffect(() => {
    temp = Cameras.filter((data) => {
      return data.id == cGates;
    });
    if (temp.length !== 0) {
      setcCameras(temp[0].cam.host);
    }
  }, [cGates]);

  function handleJoin() {
    fetch(url + "/transaction/start", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        camera: cCameras,
        gate: cGates
      })
    });
    navigation.navigate("CameraView", { gate: cGates, camera: cCameras, url });
  }

  let createPickerGates = Gates.map((s, i) => {
    return <Picker.Item label={s.name} value={s.id} key={i} />;
  });
  let result = Cameras.filter((data) => {
    return data.id == cGates;
  });
  let createPickerCameras = result.map((s, i) => {
    return <Picker.Item label={s.cam.name} value={s.cam.host} key={i} />;
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 24, flex: 1, justifyContent: "space-around" }}>
        {Platform.OS === "ios" ? (
          <View>
            <View>
              <Picker
                selectedValue={cGates}
                onValueChange={(itemValue, itemIndex) => {
                  setcGates(itemValue);
                }}
                style={{ height: 50, width: "100%", marginTop: 5 }}
              >
                {createPickerGates}
              </Picker>
            </View>
            <View style={{ marginTop: 80 }}>
              <Picker
                selectedValue={cCameras}
                style={{ height: 50, width: "100%", marginTop: 5 }}
                onValueChange={(itemValue, itemIndex) => setcCameras(itemValue)}
              >
                {createPickerCameras}
              </Picker>
            </View>
          </View>
        ) : (
          <View>
            <View style={{ marginTop: 30 }}>
              <Text>Gate</Text>
              <Picker
                selectedValue={cGates}
                onValueChange={(itemValue, itemIndex) => {
                  setcGates(itemValue);
                }}
                style={{ height: 50, width: "100%", marginTop: 5 }}
              >
                {createPickerGates}
              </Picker>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text>Camera</Text>
              <Picker
                selectedValue={cCameras}
                style={{ height: 50, width: "100%", marginTop: 5 }}
                onValueChange={(itemValue, itemIndex) => setcCameras(itemValue)}
              >
                {createPickerCameras}
              </Picker>
            </View>
          </View>
        )}

        <Button title="INICIAR" onPress={() => handleJoin()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 24,
    alignItems: "center"
  }
});
