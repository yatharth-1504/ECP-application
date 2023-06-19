import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
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
import { StatusBar } from "expo-status-bar";

// Icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
// Colors
const { brand, darkLight, primary } = Colors;
const ForgotPassword = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleOnSubmit = async (credentials, setSubmitting) => {
    console.log(credentials);
    try {
      handleMessage(null);

      const url = "http://13.127.252.0:8000/auth/sendOTP";
      // const url = "http://192.168.1.104:8000/auth/signin";

      axios
        .post(url, credentials)
        .then((response) => {
          const result = response.data;
          // console.log(result);

          // // const { loginStatus, error } = result;
          // if (!loginStatus) {
          //   handleMessage(error, "FAILED");
          // } else {
          //   // persistLogin({ result, message });
          //   navigation.navigate("Home");
          // }
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);

          handleMessage("An error occurred try again");
        });

      //call api
      setSubmitting(false);
      navigation.navigate("ResetPassword", { email: credentials.email });
      // show the modal
    } catch (error) {
      handleMessage(error.message, "FAILED");
      setSubmitting(false);
    }
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer
        style={{
          marginTop: 30,
        }}
      >
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
              <SubTitle
                style={{
                  fontSize: 15,
                  width: "90%",
                  textAlign: "center",
                }}
              >
                Provide the details below to begin the process
              </SubTitle>
              <Formik
                initialValues={{
                  email: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  values = { ...values };
                  if (values.email == "") {
                    handleMessage("Please enter email address");
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
                    <MyTextInput
                      label="Email Address"
                      icon="mail"
                      placeholder="xyz@gmail.com"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
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
                    <ExtraView>
                      <TextLink onPress={() => navigation.navigate("Login")}>
                        <TextLinkContent>Login</TextLinkContent>
                      </TextLink>
                    </ExtraView>
                  </StyledFormArea>
                )}
              </Formik>
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

export default ForgotPassword;
