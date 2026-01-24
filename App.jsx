import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux"; //
import { store } from "./src/store/store"; //
import AppNavigator from "./src/navigation/AppNavigator.jsx";

function App() {
  return (
    <Provider store={store}> 
      <SafeAreaProvider>
        <NavigationContainer>
           <AppNavigator /> 
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
export default App;