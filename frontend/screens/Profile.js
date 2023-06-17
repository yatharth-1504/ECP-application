import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";

export function Profile({ navigation, route }) {
  const user = route.params.user;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            alignItems: "center",
            height: 65,
          }}
        >
          <TouchableOpacity
            style={styles.header}
            onPress={(e) =>
              navigation.navigate("Home", { token: route.params.token })
            }
          >
            <Text style={styles.headerText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.header}
            onPress={(e) =>
              navigation.navigate("Login", { token: route.params.token })
            }
          >
            <Text style={styles.signout}>sign-out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Image
            source={
              user.photo ? { uri: user.photo } : require("../assets/login.jpg")
            }
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.course}>{user.course}</Text>
          <Text style={styles.studySubject}>{user.studySubject}</Text>
        </View>

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{user.studentPhone}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{user.address}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
  },
  headerText: {
    fontSize: 18,
    fontWeight: 900,
  },
  signout: {
    fontSize: 16,
  },
  profileInfo: {
    alignItems: "center",
    marginTop: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  course: {
    fontSize: 18,
    marginTop: 10,
  },
  studySubject: {
    fontSize: 16,
    color: "#888888",
    marginTop: 5,
  },
  additionalInfo: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 14,
    marginTop: 5,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#9CA3AF",
    // marginVertical: 10
  },
});
