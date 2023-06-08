import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { Profile } from "./screens/Profile";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
