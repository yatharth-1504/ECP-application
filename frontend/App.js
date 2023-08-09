import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import RootNavigation from "./navigation";
import { LogBox } from "react-native";
// apploading
import AppLoading from 'expo-app-loading';
// asyncstorage
import AsyncStorage from '@react-native-async-storage/async-storage';
//credentials context
import { CredentialsContext } from './components/CredentialsContext';

//Ignore all log notifications
LogBox.ignoreAllLogs();
export default function App() {
   const [appReady, setAppReady] = useState(false);
  const [storeCredentials, setStoreCredentials] = useState("");
  const checkLoginCredentials = () => {
    AsyncStorage.getItem("flowerCribCredentials")
      .then((result) => {
        // console.log(result)
        if (result != null) {
          setStoreCredentials(JSON.parse(result));
        } else {
          setStoreCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };
   if (!appReady) {
     return (
       <AppLoading
         startAsync={checkLoginCredentials}
         onFinish={() => setAppReady(true)}
         onError={console.warn}
       />
     );
   }
  return (
    <CredentialsContext.Provider
      value={{ storeCredentials, setStoreCredentials }}
    >
      <RootNavigation />
    </CredentialsContext.Provider>
  );
}
