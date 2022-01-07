import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import Button from "../../components/Button";
import { FontAwesome } from "@expo/vector-icons";
import io from "socket.io-client";

export default function Send({ navigation, route }) {
  const [Loaded, setLoaded] = useState(false);
  const [Complete, setComplete] = useState(false);
  const [Counter, setCounter] = useState(20);
  const [timerOn, setTimerOn] = useState(true);
  const [Plate, setPlate] = useState("");

  useEffect(() => {
    const socket = io(url, { reconnect: true, transports: ["websocket"] });
    socket.on("/client/container", (data) => {
      setTimerOn(false);
      setLoaded(true);
      setComplete(true);
      setPlate(data);
    });
    socket.on("/client/plate", (data) => {
      setTimerOn(false);
      setLoaded(true);
      setComplete(true);
      setPlate(data);
    });
    socket.on("/client/wagon", (data) => {
      setTimerOn(false);
      setLoaded(true);
      setComplete(true);
      setPlate(data);
    });
  }, []);

  let gate = route.params.gate;
  let camera = route.params.camera;
  let url = route.params.url;

  function endTransition() {
    fetch(url + "/transaction/end", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        camera,
        gate
      })
    });
    navigation.pop(2);
  }
  function tryAgain() {
    navigation.pop();
  }

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setCounter((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  useEffect(() => {
    if (Counter === 0) {
      setTimerOn(false);
      setLoaded(true);
      setComplete(false);
    }
  }, [Counter]);

  return Loaded === true ? (
    Complete === true ? (
      <View style={{ flex: 1, justifyContent: "space-around", padding: 20 }}>
        <View style={styles.container}>
          <Text
            style={{
              position: "absolute",
              top: 75,
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            {Plate}
          </Text>
          <FontAwesome name="check-circle-o" size={80} color="limegreen" />
          <View style={{ marginTop: 20, marginBottom: 30 }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              PLACA RECONHECIDA COM SUCESSO
            </Text>
          </View>
          <Text style={{ textAlign: "center" }}>
            Reconhecemos a placa fotografada! Caso o resultado não coincida com
            a foto, basta tentar novamente.
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              padding: 5,
              alignItems: "center"
            }}
            onPress={() => {
              tryAgain();
            }}
          >
            <Text style={{ color: "#007AFF", fontWeight: "500" }}>
              TENTAR NOVAMENTE
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title="FINALIZAR"
          onPress={() => {
            endTransition();
          }}
        />
      </View>
    ) : (
      <View style={{ flex: 1, justifyContent: "space-around", padding: 20 }}>
        <View style={styles.container}>
          <FontAwesome name="times-circle-o" size={80} color="tomato" />
          <View style={{ marginTop: 20, marginBottom: 30 }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              A CONEXÃO ATINGIU O LIMITE DE TEMPO
            </Text>
          </View>
          <Text style={{ textAlign: "center" }}>
            Recomendamos que capture outra foto para que o wegate possa refazer
            o processamento.
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              padding: 5,
              alignItems: "center"
            }}
            onPress={() => {
              tryAgain();
            }}
          >
            <Text style={{ color: "#007AFF", fontWeight: "500" }}>
              TENTAR NOVAMENTE
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title="FINALIZAR"
          onPress={() => {
            endTransition();
          }}
        />
      </View>
    )
  ) : (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator color="#007AFF" style={{ padding: 20 }} size="large" />
      <View style={{ alignItems: "center" }}>
        <Text>Aguardando Processamento</Text>
        <Text style={{ color: "gray" }}>{Counter}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  horizontal: {
    //flexDirection: "row",
    padding: 10
  },

  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
