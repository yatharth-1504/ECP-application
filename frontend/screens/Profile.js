import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking,
} from "react-native";
//credentials context
import { CredentialsContext } from "../components/CredentialsContext";
// asyncstorage
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Profile({ navigation, route }) {
  const { storeCredentials, setStoreCredentials } =
    useContext(CredentialsContext);
  const courseTaken = storeCredentials.data.student.course;

  const user = route.params.user;
  //credentials context
  const clearLogin = () => {
    AsyncStorage.removeItem("flowerCribCredentials")
      .then(() => {
        setStoreCredentials("");
      })
      .catch((error) => console.log(error));
  };
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
          <TouchableOpacity style={styles.header} onPress={clearLogin}>
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
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Class Link</Text>
            {courseTaken === "CA Foundation" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/wag-zcze-cgq")
                }
              >
                https://meet.google.com/wag-zcze-cgq
              </Text>
            ) : courseTaken === "CA Intermediate" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/bbu-faxm-ota")
                }
              >
                https://meet.google.com/bbu-faxm-ota
              </Text>
            ) : courseTaken === "CA Final" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/uks-sriv-hiq")
                }
              >
                https://meet.google.com/uks-sriv-hiq
              </Text>
            ) : courseTaken === "CS-EET" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/uhr-joov-nor")
                }
              >
                https://meet.google.com/uhr-joov-nor
              </Text>
            ) : courseTaken === "CS Executive" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/pan-cdpm-yzi")
                }
              >
                https://meet.google.com/pan-cdpm-yzi
              </Text>
            ) : courseTaken === "CMA Foundation" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/fza-ugym-hem")
                }
              >
                https://meet.google.com/fza-ugym-hem
              </Text>
            ) : courseTaken === "CMA Intermediate" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/ycg-kccc-roz")
                }
              >
                https://meet.google.com/ycg-kccc-roz
              </Text>
            ) : courseTaken === "CMA Final" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/vwy-bpuv-qyz")
                }
              >
                https://meet.google.com/vwy-bpuv-qyz
              </Text>
            ) : courseTaken === "B. Com" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/pcs-mnzt-wbn")
                }
              >
                https://meet.google.com/pcs-mnzt-wbn
              </Text>
            ) : courseTaken === "M. Com" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/bka-sqmj-gfn")
                }
              >
                https://meet.google.com/bka-sqmj-gfn
              </Text>
            ) : courseTaken === "Computer Course" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/ipe-obem-osr")
                }
              >
                https://meet.google.com/ipe-obem-osr
              </Text>
            ) : courseTaken === "11th" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/qxr-yxom-eck")
                }
              >
                https://meet.google.com/qxr-yxom-eck
              </Text>
            ) : courseTaken === "12th" ? (
              <Text
                style={styles.infoValue}
                onPress={() =>
                  Linking.openURL("https://meet.google.com/isd-egcb-bfm")
                }
              >
                https://meet.google.com/isd-egcb-bfm
              </Text>
            ) : (
              ""
            )}
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
