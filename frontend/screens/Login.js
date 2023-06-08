import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Input, Button } from "react-native-elements";

export function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();

  const onLogin = () => {
    fetch("http://192.168.1.38:8000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        navigation.navigate("Home", { token: data.jwtToken });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/login.jpg")} />
      <Input
        placeholder="Your Email"
        placeholderTextColor="#888"
        inputStyle={styles.input}
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={(value) => {
          setPass(value);
        }}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
      />
      <Button title="Login" buttonStyle={styles.button} onPress={onLogin} />
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
