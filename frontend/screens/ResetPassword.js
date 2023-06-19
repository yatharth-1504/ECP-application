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
const ResetPassword = ({ navigation, route }) => {
  console.log(route.params);
  const { email } = route.params;
  // console.log(email);
  // const email = route.params.email;
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  // code imput
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  // const [pinSeady, setPinSeady] = useState(false);
  const [isVerifyOTP, setIsVerifyOTP] = useState(false);

  //resending email
  const [activeResend, setActiveResend] = useState(false);
  const [resendStatus, setResendStatus] = useState("Resend");
  const [resendingEmail, setResendingEmail] = useState(false);
  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [buttonText, setButtonText] = useState("Verify OTP");

  const FormWrapper = styled.View`
    width: 100%;
    align-items: center;
    ${(props) => {
      return props.pinReady ? `opacity:1` : `opacity:0.3`;
    }}
  `;
  const FormSrapper = styled.View`
    width: 100%;
    align-items: center;
    ${(props) => {
      return props.pinSeady ? `opacity:1` : `opacity:0.3`;
    }}
  `;

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

  const handleOnSubmit = async (credentials, setSubmitting) => {
    try {
      handleMessage(null);
      //call api
      setSubmitting(false);
      // show the modal
      return showModal(
        "success",
        "All Good!",
        "Your Password has been Reset.",
        "Login"
      );
    } catch (error) {
      setSubmitting(false);
      return showModal("failed", "Failed!", error.message, "Close");
    }
  };

  const resendEmail = async (triggerTimer) => {
    try {
      setResendingEmail(true);
      //make req with backend

      // setResendStatus() to 'Failed!' or 'Sent!'

      setResendingEmail(false);
      // hold on bit
      setTimeout(() => {
        setResendStatus("Resend");
        setActiveResend(false);
        triggerTimer();
      }, 5000);
    } catch (error) {
      setResendingEmail(false);
      setResendStatus("Failed!");
      alert("Email Resend Failed: " + error.message);
    }
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  const handleOnOtp = async () => {
    // console.log(credentials);

    try {
      setButtonText("Verifying OTP...");
      handleMessage(null);

      const url = "http://13.127.252.0:8000/auth/verifyOTP";

      const otpData = {
        email: email,
        otp: code,
      };

      axios
        .post(url, otpData)
        .then((response) => {
          const result = response.data;
          console.log(result);
          setButtonText("OTP Verified...");
          navigation.navigate("ResetPasswordNew", { email: email });
        })
        .catch((error) => {
          console.log(error);
          setIsVerifyOTP(false);

          handleMessage("An error occurred try again");
          setButtonText("OTP Verification Failed...");
        });

      //call api

      // show the modal
    } catch (error) {
      handleMessage(error.message, "FAILED");
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
              <SubTitle
                style={{
                  fontSize: 15,
                  //   width: "90%",
                  textAlign: "center",
                }}
              >
                Enter the 4-digit code sent to your Email or Spam account
              </SubTitle>

              <StyledCodeInput
                code={code}
                setCode={setCode}
                maxLength={MAX_CODE_LENGTH}
                setPinReady={setPinReady}
              />

              <FormWrapper pinReady={pinReady}>
                <MsgBox type={messageType}>{message}</MsgBox>

                <StyledButton onPress={handleOnOtp} disabled={!pinReady}>
                  <ButtonText>{buttonText}</ButtonText>
                </StyledButton>
              </FormWrapper>

              <ResendTimer
                activeResend={activeResend}
                setActiveResend={setActiveResend}
                resendStatus={resendStatus}
                resendingEmail={resendingEmail}
                resendEmail={resendEmail}
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

export default ResetPassword;
