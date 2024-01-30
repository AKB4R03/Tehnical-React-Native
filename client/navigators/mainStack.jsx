import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";

import LoginScreen from "../screens/login";

import { loginContext } from "../context/loginContext";

const Stack = createNativeStackNavigator();

import TransactionScreen from "../screens/transaction";
import MainTab from "./mainTab";
import EditTransactionScreen from "../screens/editTransactionScreen";
import EditStuffScreen from "../screens/editStuffScreen";

const MainStack = () => {
  const { isLogin } = useContext(loginContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "white",
        }}
      >
        {isLogin ? (
          <>
            <Stack.Screen
              name={"mainTab"}
              component={MainTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={"EditTransaction"}
              component={EditTransactionScreen}
            />
            <Stack.Screen name={"EditStuff"} component={EditStuffScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name={"Login"}
              options={{ headerShown: false }}
              component={LoginScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
