import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
// import { createDrawerNavigator } from '@react-navigation/drawer';

export function Header({ onNav, user }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Hi {user.name} 🤗</Text>
      <TouchableOpacity onPress={e => onNav(user)}>
        <Image style={styles.image} source={require("../assets/login.jpg")} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    backgroundColor: "#F5F5F5",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
    resizeMode: "stretch",
    margin: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    color: "#555555",
  },
});
