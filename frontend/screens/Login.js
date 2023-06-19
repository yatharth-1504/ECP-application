import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  Touchable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { PageLogo } from "../components/styles";
import { Input, Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();

  const onLogin = () => {
    fetch("http://13.127.252.0:8000/auth/signin", {
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
      <StatusBar style="dark" />

      <PageLogo
        resizeMode="contain"
        source={require("../assets/HHFavicon.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <View
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 50,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "green",
          }}
        >
          Excellent Commerce Point
        </Text>
      </View>
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
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button title="Login" buttonStyle={styles.button} onPress={onLogin} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              marginRight: 10,
            }}
          >
            Forgot Password?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={{
                color: "green",
              }}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: "100%",
    height: 200,
    resizeMode: "stretch",
    margin: 20,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "green",
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    height: 60,
  },
});
