import React from "react";
import { View, Linking, StyleSheet, FlatList, Text } from "react-native";

export function ResourceBoard({ resourceBoardData }) {
  const renderResourceBoardItem = ({ item }) => (
    <View style={styles.resourceBoardCard}>
      <Text style={styles.resourceBoardTitle}>{item.title}</Text>
      <Text
        style={styles.resourceBoardContent}
        onPress={() => Linking.openURL(item.description)}
      >
        {item.description}
      </Text>
    </View>
  );
  return (
    <View style={styles.resourceBoard}>
      <Text style={styles.resourceBoardHeading}>Resources</Text>
      <FlatList
        data={resourceBoardData}
        renderItem={renderResourceBoardItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.resourceBoardList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  resourceBoard: {
    flex: 1,
    padding: 20,
  },
  resourceBoardHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10,
  },
  resourceBoardCard: {
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
  resourceBoardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resourceBoardContent: {
    fontSize: 14,
    color: "#888888",
  },
  resourceBoardList: {
    flexGrow: 1,
  },
});
