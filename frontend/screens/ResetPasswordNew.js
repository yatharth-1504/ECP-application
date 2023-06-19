import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
// Api Client
import axios from "axios";

// formik
import { Formik } from "formik";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../components/styles";

// Icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import StyledCodeInput from "../components/StyledCodeInput";
import ResendTimer from "../components/Timers/ResendTimer";
import MessageModal from "../components/Modals/MessageModal";
// Colors
const { brand, darkLight, primary } = Colors;
const ResetPasswordNew = ({ navigation, route }) => {
  const email = route.params ? route.params.email : "";
  console.log(email);
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [buttonText, setButtonText] = useState("");

  const buttonHandler = () => {
    if (modalMessageType === "success") {
      navigation.navigate("Login");
    }
    setModalVisible(false);
  };

  const showModal = (type, headerText, message, buttonText) => {
    setModalMessageType(type);
    setHeaderText(headerText);
    setModalMessage(message);
    setButtonText(buttonText);
    setModalVisible(true);
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  const handleOnSubmit = async (credentials, setSubmitting) => {
    console.log(credentials);
    try {
      handleMessage(null);

      const url = "http://13.127.252.0:8000/auth/resetPassword";

      const password = {
        email: email,
        new_password: credentials.newPassword,
      };

      axios
        .post(url, password)
        .then((response) => {
          const result = response.data;
          console.log(result);
          showModal(
            "success",
            "All Good!",
            "Your Password has been Reset.",
            "Login"
          );
          handleMessage("Password Reset Successful", "SUCCESS");
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          showModal("failed", "Failed!", error.message, "Close");
          handleMessage("An error occurred try again");
          setSubmitting(false);
        });

      // show the modal
    } catch (error) {
      handleMessage(error.message, "FAILED");
      showModal("failed", "Failed!", error.message, "Close");
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <ScrollView
            style={{
              width: "100%",
              padding: 0,
            }}
            showsVerticalScrollIndicator={false}
          >
            <InnerContainer>
              <PageLogo
                resizeMode="contain"
                source={require("../assets/HHFavicon.png")}
                style={{
                  width: 200,
                  height: 200,
                }}
              />
              <PageTitle
                style={{
                  fontSize: 25,
                }}
              >
                Excellent Commerce Point
              </PageTitle>

              <Formik
                initialValues={{
                  newPassword: "",
                  confirmNewPassword: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  values = { ...values };
                  if (
                    values.newPassword == "" ||
                    values.confirmNewPassword == ""
                  ) {
                    handleMessage("Please fill in all fields.");
                    setSubmitting(false);
                  } else if (values.newPassword != values.confirmNewPassword) {
                    handleMessage("Passwords do not match.");
                    setSubmitting(false);
                  } else {
                    handleOnSubmit(values, setSubmitting);
                  }
                  // navigation.navigate("Login");
                  // setSubmitting(false);
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  isSubmitting,
                }) => (
                  <StyledFormArea
                    style={{
                      marginTop: 20,
                    }}
                  >
                    <SubTitle
                      style={{
                        fontSize: 15,
                        //   width: "90%",
                        textAlign: "center",
                      }}
                    >
                      Enter new password
                    </SubTitle>
                    <MyTextInput
                      label="New Password"
                      icon="lock"
                      placeholder="* * * * * * * *"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("newPassword")}
                      onBlur={handleBlur("newPassword")}
                      value={values.newPassword}
                      secureTextEntry={hidePassword}
                      isPassword={true}
                      hidePassword={hidePassword}
                      setHidePassword={setHidePassword}
                    />
                    <MyTextInput
                      label="Confirm New Password"
                      icon="lock"
                      placeholder="* * * * * * * *"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("confirmNewPassword")}
                      onBlur={handleBlur("confirmNewPassword")}
                      value={values.confirmNewPassword}
                      secureTextEntry={hidePassword}
                      isPassword={true}
                      hidePassword={hidePassword}
                      setHidePassword={setHidePassword}
                    />
                    <MsgBox type={messageType}>{message}</MsgBox>
                    {!isSubmitting && (
                      <StyledButton onPress={handleSubmit}>
                        <ButtonText>Submit</ButtonText>
                      </StyledButton>
                    )}
                    {isSubmitting && (
                      <StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={primary} />
                      </StyledButton>
                    )}

                    <Line />
                  </StyledFormArea>
                )}
              </Formik>
              <MessageModal
                modalVisible={modalVisible}
                buttonHandler={buttonHandler}
                type={modalMessageType}
                headerText={headerText}
                message={modalMessage}
                buttonText={buttonText}
              />
            </InnerContainer>
          </ScrollView>
        </View>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <LeftIcon>
        <Octicons name={icon} size={25} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker} activeOpacity={1}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={25}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default ResetPasswordNew;
