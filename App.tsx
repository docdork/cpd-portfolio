import { NavigationContainer } from "@react-navigation/native";

import { Routes } from "./router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./Pages/HomeScreen";
import PersonalDetailsScreen from "./Pages/PersonalDetailsScreen";
import CPDInputScreen from "./Pages/CPDInputScreen";
import CPDListScreen from "./Pages/CPDListScreen";
import { StatusBar } from "expo-status-bar";
import { AuthContextProvider } from "./context/AuthContext";

const Drawer = createDrawerNavigator<Routes>();

export default function App() {
  return (
    <AuthContextProvider>
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
          <Drawer.Screen
            name="PersonalDetails"
            component={PersonalDetailsScreen}
            options={{ title: "Personal Details" }}
          />
          <Drawer.Screen
            name="CPDInput"
            component={CPDInputScreen}
            options={{ title: "CPD Input" }}
          />
          <Drawer.Screen
            name="CPDList"
            component={CPDListScreen}
            options={{ title: "CPD List" }}
          />
        </Drawer.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
