import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Input, Button } from "react-native-elements";

export function Login() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/login.jpg")} />
      <Input
        placeholder="Username"
        placeholderTextColor="#888"
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
      />
      <Button title="Login" buttonStyle={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "stretch",
    margin: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginTop: 10,
  },
});
