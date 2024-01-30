import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import TransactionScreen from "../screens/transaction";
import AddTransactionScreen from "../screens/addTransactionScreen";
import StuffScreen from "../screens/stuff";
import AddStuffScreen from "../screens/addStuffScreen";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#121212",
        },
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "money-check" : "money-check-dollar";
            return <FontAwesome6 name={iconName} color={color} size={size} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "money-bill" : "money-bills";
            return <FontAwesome6 name={iconName} color={color} size={size} />;
          },
          headerShown: true,
          title: false,
          headerStyle: {
            backgroundColor: "#2F3D7E",
          },
        }}
      />
      <Tab.Screen
        name="Stuff"
        component={StuffScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "gifts" : "gift";
            return <FontAwesome6 name={iconName} color={color} size={size} />;
          },
          headerShown: false,
          title: false,
          headerStyle: {
            backgroundColor: "#2F3D7E",
          },
        }}
      />

      <Tab.Screen
        name="AddStuff"
        component={AddStuffScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "gift-open" : "gift-open-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                color={color}
                size={size}
              />
            );
          },
          headerShown: true,
          title: false,
          headerStyle: {
            backgroundColor: "#2F3D7E",
          },
        }}
      />
    </Tab.Navigator>
  );
}
