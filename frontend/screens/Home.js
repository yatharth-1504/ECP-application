import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Header } from "../components/Header";
import { NoticeBoard } from "../components/Notice";

export function Home() {
  // Sample data for notice board cards
  const noticeBoardData = [
    {
      id: "1",
      title: "Important Notice",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "2",
      title: "Exam Schedule",
      content:
        "Pellentesque ac ex ullamcorper, consequat nunc vel, pulvinar odio.",
    },
    // Add more notice board cards here
  ];
  // Todo Fetch from API

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <NoticeBoard noticeBoardData={noticeBoardData} />
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
  footer: {
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
  },
  footerText: {
    fontSize: 12,
    color: "#555555",
  },
});
