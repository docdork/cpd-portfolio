import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "./router";

import HomeScreen from "./Pages/HomeScreen";
import PersonalDetailsScreen from "./Pages/PersonalDetailsScreen";
import CPDInputScreen from "./Pages/CPDInputScreen";
import CPDListScreen from "./Pages/CPDListScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="PersonalDetailsScreen"
          component={PersonalDetailsScreen}
          options={{ title: "Personal Details" }}
        />
        <Stack.Screen
          name="CPDInputScreen"
          component={CPDInputScreen}
          options={{ title: "CPD Input" }}
        />
        <Stack.Screen
          name="CPDListScreen"
          component={CPDListScreen}
          options={{ title: "CPD List" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
