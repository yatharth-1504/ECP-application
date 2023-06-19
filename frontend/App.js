import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import RootNavigation from "./navigation";
import { LogBox } from "react-native";


//Ignore all log notifications
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <>
      <RootNavigation />
    </>
  );
}
