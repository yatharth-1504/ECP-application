import React, { useContext } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
//credentials context
import { CredentialsContext } from "./CredentialsContext";
// asyncstorage
import AsyncStorage from "@react-native-async-storage/async-storage";

export function NoticeBoard({ noticeBoardData }) {
  //credentials context
  const { storeCredentials, setStoreCredentials } =
    useContext(CredentialsContext);

  const courseTaken = storeCredentials.data.student.course;
  const renderNoticeBoardItem = ({ item }) => (
    <>
      {item.course === courseTaken ? (
        <View style={styles.noticeBoardCard}>
          <Text style={styles.noticeBoardTitle}>{item.title}</Text>
          <Text style={styles.noticeBoardContent}>{item.description}</Text>
        </View>
      ) : (
        ""
      )}
    </>
  );
  return (
    <View style={styles.noticeBoard}>
      <Text style={styles.noticeBoardHeading}>Notices</Text>
      <FlatList
        data={noticeBoardData}
        renderItem={renderNoticeBoardItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.noticeBoardList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
