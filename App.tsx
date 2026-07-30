import { NavigationContainer } from "@react-navigation/native";
import Login from "./Pages/Login";
import { Routes } from "./router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./Pages/HomeScreen";
import CPDInputScreen from "./Pages/CPDInputScreen";
import CPDListScreen from "./Pages/CPDListScreen";
import { StatusBar } from "expo-status-bar";
import { AuthContextProvider } from "./context/AuthContext";
import SignUp from "./Pages/SignUp";
import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";

const Drawer = createDrawerNavigator<Routes>();

function AppNavigator() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          drawerType: "front",
          headerStyle: { backgroundColor: "#023f4e" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          drawerStyle: { backgroundColor: "#023f4e" },
          drawerActiveTintColor: "#07e549",
          drawerInactiveTintColor: "#05eeff",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />

        {user && (
          <Drawer.Screen
            name="CPDInput"
            component={CPDInputScreen}
            options={{ title: "CPD Input" }}
          />
        )}
        {user && (
          <Drawer.Screen
            name="CPDList"
            component={CPDListScreen}
            options={{ title: "CPD List" }}
          />
        )}

        {!user && (
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />
        )}
        {!user && (
          <Drawer.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "Sign Up" }}
          />
        )}
        {user && (
          <Drawer.Screen
            name="Logout"
            component={HomeScreen}
            listeners={{
              drawerItemPress: () => {
                logout(); // Call the logout function
              },
            }}
          />
        )}
      </Drawer.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <AppNavigator />
    </AuthContextProvider>
  );
}
