import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export function Refresh({ handleRefresh }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>⟳</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  refreshButton: {
    height: 75,
    width: 65,
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  refreshButtonText: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
  },
  footer: {
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
});
