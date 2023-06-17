import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";

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
} from "../../components/styles";

const StyledView = styled.View`
  align-items: center;
`;
const ResendText = styled(ExtraText)`
  color: green;
  font-weight: bold;
  ${(props) => {
    const { resendStatus } = props;
    if (resendStatus == "Failed!") {
      return `color: red`;
    } else if (resendStatus == "Sent!") {
      return `color: green`;
    }
  }}
`;
const ResendTimer = ({
  activeResend,
  setActiveResend,
  targetTimeInSeconds,
  resendEmail,
  resendStatus,
  ...props
}) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTargetTime] = useState(null);
  let resendTimerInterval;
  const triggerTimer = (targetTimeInSeconds = 30) => {
    setTargetTime(targetTimeInSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
  };
  const calculateTimeLeft = (finalTime) => {
    const difference = finalTime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      clearInterval(resendTimerInterval);
      setActiveResend(true);
      setTimeLeft(null);
    }
  };
  useEffect(() => {
    triggerTimer(targetTimeInSeconds);
    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);
  return (
    <StyledView style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
    }}>
      <ExtraView>
        <ExtraText>Didn't receive the email? </ExtraText>
        <TextLink
          onPress={() => resendEmail(triggerTimer)}
          disabled={!activeResend}
          style={{
            opacity: activeResend ? 1 : 0.5,
          }}
        >
          <ResendText resendStatus={resendStatus}>{resendStatus}</ResendText>
        </TextLink>

        
      </ExtraView>
      <ExtraView style={{
        marginTop: -10,
      }}>
      {!activeResend && (
          <ExtraText>
            {" "}
            in <TextLinkContent>{timeLeft || targetTime}</TextLinkContent>{" "}
            second(s){" "}
          </ExtraText>
        )}
      </ExtraView>
    </StyledView>
  );
};

export default ResendTimer;
