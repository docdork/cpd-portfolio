import { NavigationContainer } from "@react-navigation/native";
import Login from "./Pages/Login";
import { Routes } from "./router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./Pages/HomeScreen";
import CPDInputScreen from "./Pages/CPDInputScreen";
import CPDListScreen from "./Pages/CPDListScreen";
import { StatusBar } from "expo-status-bar";
import SignUp from "./Pages/SignUp";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useAuth, useClerk } from "@clerk/expo";
import {
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import styles from "./styles";

const Drawer = createDrawerNavigator<Routes>();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable",
  );
}

function AppNavigator() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#023f4e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isSignedIn ? (
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

            {isSignedIn && (
              <Drawer.Screen
                name="CPDInput"
                component={CPDInputScreen}
                options={{ title: "CPD Input" }}
              />
            )}
            {isSignedIn && (
              <Drawer.Screen
                name="CPDList"
                component={CPDListScreen}
                options={{ title: "CPD List" }}
              />
            )}

            {!isSignedIn && (
              <Drawer.Screen
                name="Login"
                component={Login}
                options={{ title: "Login" }}
              />
            )}
            {!isSignedIn && (
              <Drawer.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: "Sign Up" }}
              />
            )}
            {isSignedIn && (
              <Drawer.Screen
                name="Logout"
                component={HomeScreen}
                listeners={{
                  drawerItemPress: () => {
                    signOut();
                  },
                }}
              />
            )}
          </Drawer.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to the CPD App</Text>
          <Login />
          <SignUp />
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <AppNavigator />
    </ClerkProvider>
  );
}
