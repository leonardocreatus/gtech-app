import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

export default function InputText(props) {
  return (
    <View>
      <Input
        label={props.title}
        placeholder={props.title}
        leftIcon={props.icon}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
}
