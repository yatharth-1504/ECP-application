import { View, Text, Modal } from "react-native";
import React from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
const ModalPressableContainer = styled.Pressable`
  flex: 1;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;
const ModalView = styled.View`
  background-color: #fff;
  border-radius: 20px;
  width: 100%;
  padding: 35px;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`;
const MessageModal = ({
  modalVisible,
  buttonHandler,
  type,
  headerText,
  message,
  buttonText,
}) => {
  return (
    <Modal animationType="fade" visible={modalVisible} transparent={true}>
      <ModalPressableContainer onPress={buttonHandler}>
        <ModalView>
          <MaterialCommunityIcons
            name={type === "success" ? "check-circle" : "close-circle"}
            size={100}
            color={type === "success" ? "green" : "red"}
          />
          <ExtraText
            style={{
              fontSize: 20,
              color: "black",
              marginVertical: 10,
            }}
          >
            {headerText}
          </ExtraText>
          <ExtraText
            style={{
              marginBottom: 20,
            }}
          >
            {message}
          </ExtraText>
          <StyledButton
            style={{
              borderRadius: 20,
            }}
            onPress={buttonHandler}
          >
            <ButtonText>{buttonText || `Complete`}</ButtonText>
          </StyledButton>
        </ModalView>
      </ModalPressableContainer>
    </Modal>
  );
};

export default MessageModal;
