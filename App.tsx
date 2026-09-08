import { NavigationContainer } from "@react-navigation/native";
import Login from "./Pages/Login";
import { Routes } from "./router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./Pages/HomeScreen";
import CPDInputScreen from "./Pages/CPDInputScreen";
import CPDListScreen from "./Pages/CPDListScreen";
import { StatusBar } from "expo-status-bar";
// import { AuthContextProvider } from "./context/AuthContext";
import SignUp from "./Pages/SignUp";
import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";
import { ClerkProvider } from "@clerk/expo";
import {tokenCache} from "@clerk/expo/token-cache";
import {useAuth} from "@clerk/expo";
import {useHostedAuth} from "@clerk/expo/hosted-auth";
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import styles from "./styles";



const Drawer = createDrawerNavigator<Routes>();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable");
}

function AppNavigator() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const { isLoaded, isSignedIn } = useAuth();
  const {startHostedAuth} = useHostedAuth();

  const handleSignUp = async () => {
    try {
      await startHostedAuth({ mode: "sign-up" });
    } catch (error) {
      console.error("Error starting hosted auth:", error);
    }
  };

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
        <HomeScreen />
      ) : (
        <Button
          title="Sign Up"
          onPress={handleSignUp}
        />
      )}
    </View>



    // <NavigationContainer>
    //   <Drawer.Navigator
    //     screenOptions={{
    //       headerShown: true,
    //       drawerType: "front",
    //       headerStyle: { backgroundColor: "#023f4e" },
    //       headerTintColor: "#fff",
    //       headerTitleStyle: { fontWeight: "bold" },
    //       drawerStyle: { backgroundColor: "#023f4e" },
    //       drawerActiveTintColor: "#07e549",
    //       drawerInactiveTintColor: "#05eeff",
    //     }}
    //   >
    //     <Drawer.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{ title: "Home" }}
    //     />

    //     {user && (
    //       <Drawer.Screen
    //         name="CPDInput"
    //         component={CPDInputScreen}
    //         options={{ title: "CPD Input" }}
    //       />
    //     )}
    //     {user && (
    //       <Drawer.Screen
    //         name="CPDList"
    //         component={CPDListScreen}
    //         options={{ title: "CPD List" }}
    //       />
    //     )}

    //     {!user && (
    //       <Drawer.Screen
    //         name="Login"
    //         component={Login}
    //         options={{ title: "Login" }}
    //       />
    //     )}
    //     {!user && (
    //       <Drawer.Screen
    //         name="SignUp"
    //         component={SignUp}
    //         options={{ title: "Sign Up" }}
    //       />
    //     )}
    //     {user && (
    //       <Drawer.Screen
    //         name="Logout"
    //         component={HomeScreen}
    //         listeners={{
    //           drawerItemPress: () => {
    //             logout(); // Call the logout function
    //           },
    //         }}
    //       />
    //     )}
    //   </Drawer.Navigator>
    //   <StatusBar style="auto" />
    // </NavigationContainer>
  );
}

export default function App() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {/* <AuthContextProvider> */}
        <AppNavigator />
      {/* </AuthContextProvider> */}
    </ClerkProvider>
  );
}
