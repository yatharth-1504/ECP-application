import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { Profile } from "./screens/Profile";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import ResetPasswordNew from "./screens/ResetPasswordNew";
import { CredentialsContext } from "./components/CredentialsContext";
import { StatusBar } from "expo-status-bar";
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function ReactNavigation() {
  return (
    <CredentialsContext.Consumer>
      {({ storeCredentials, setStoreCredentials }) => (
        <NavigationContainer theme={theme}>
          <StatusBar
            style={{
              backgroundColor: "black",
            }}
          />
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Login"
          >
            {storeCredentials ? (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Profile" component={Profile} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen
                  name="ResetPasswordNew"
                  component={ResetPasswordNew}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
}
