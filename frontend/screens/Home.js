import React, { useEffect, useState, useContext } from "react";
import Lottie from "lottie-react-native";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { Header } from "../components/Header";
import { NoticeBoard } from "../components/Notice";
import { ResourceBoard } from "../components/Resource";
import { Refresh } from "../components/Refresh";
//credentials context
import { CredentialsContext } from "../components/CredentialsContext";
// asyncstorage
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home({ navigation, route }) {
  const [notices, setNotices] = useState(null);
  const [resources, setResources] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  //credentials context
  const { storeCredentials, setStoreCredentials } =
    useContext(CredentialsContext);
  console.log(storeCredentials.data.jwtToken);
  console.log(storeCredentials.data.student.course);
  const courseTaken = storeCredentials.data.student.course;
  const token = storeCredentials.data.jwtToken;
  // const token = route.params.token;

  useEffect(() => {
    fetch("http://13.127.252.0:8000/auth/getme", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: storeCredentials.data.jwtToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.currentUser);
      })
      .catch((e) => {
        console.log(e);
      }),
      fetch("http://192.168.0.145:8000/notice/getnotices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: storeCredentials.data.jwtToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error");
          }
          return response.json();
        })
        .then((data) => {
          setNotices(data.notices);
          console.log(data.notices);
        })
        .catch((e) => {
          console.log(e);
        });
    fetch("http://192.168.0.145:8000/resource/getresources", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: storeCredentials.data.jwtToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        setResources(data.resources);
        console.log(data.resources);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refreshing]);

  const handleRefresh = () => {
    setRefreshing(!refreshing);
  };

  const onNav = (currUser) => {
    navigation.navigate("Profile", { user: currUser, token });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {!!user && <Header onNav={onNav} user={user} />}
        {!!user && !!notices && (
          <NoticeBoard noticeBoardData={notices} coursetaken={courseTaken} />
        )}
        {!!user && !!notices && !!resources && (
          <ResourceBoard
            resourceBoardData={resources}
            coursetaken={courseTaken}
          />
        )}

        <Refresh handleRefresh={handleRefresh} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  noticeBoard: {
    flex: 1,
    padding: 20,
  },
  noticeBoardHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10,
  },
  noticeBoardCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noticeBoardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noticeBoardContent: {
    fontSize: 14,
    color: "#888888",
  },
  noticeBoardList: {
    flexGrow: 1,
  },
});
