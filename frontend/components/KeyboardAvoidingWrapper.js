import React from "react";
//keyboard avoiding view
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
