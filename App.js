import { NavigationContainer } from "@react-navigation/native";

import MainNavigation from "./src/navigator/MainNavigation";
import { View, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </SafeAreaProvider>

  );
}


