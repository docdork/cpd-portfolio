import { NavigationContainer } from "@react-navigation/native";

import { Routes } from "./router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./Pages/HomeScreen";
import PersonalDetailsScreen from "./Pages/PersonalDetailsScreen";
import CPDInputScreen from "./Pages/CPDInputScreen";
import CPDListScreen from "./Pages/CPDListScreen";

const Drawer = createDrawerNavigator<Routes>();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
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
    </NavigationContainer>
  );
}
