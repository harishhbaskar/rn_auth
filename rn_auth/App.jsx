import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { StripeProvider } from '@stripe/stripe-react-native';
import AppNavigator from "./src/navigation/AppNavigator.jsx";
import { STRIPE_PUBLISH_KEY } from '@env';

function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_PUBLISH_KEY}>
        <SafeAreaProvider publishableKey={STRIPE_PUBLISH_KEY}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </StripeProvider>
    </Provider>
  );
}
export default App;