import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function Button(props) {
  return (
    <View style={[styles.button, props.style]}>
      <TouchableOpacity style={styles.testButton} onPress={props.onPress}>
        <Text style={styles.testText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    marginTop: 12,
    borderRadius: 20
  },
  buttonInside: {
    borderRadius: 10
  },
  testButton: {
    alignItems: "center",
    padding: 10
  },
  testText: {
    color: "white",
    fontWeight: "500"
  }
});
