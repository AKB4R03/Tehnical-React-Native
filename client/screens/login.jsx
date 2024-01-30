import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import { useLazyQuery } from "@apollo/client";
import { DO_LOGIN } from "../queries";
import * as SecureStore from "expo-secure-store";
import { loginContext } from "../context/loginContext";

const LoginScreen = () => {
  const { setIsLogin } = useContext(loginContext);

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dispatcher, { data, error }] = useLazyQuery(DO_LOGIN, {
    onCompleted: async (res) => {
      try {
        let token = null;
        if (res && res.login && res.login.data && res.login.data.token) {
          token = res.login.data.token;
        }
        console.log("token <<<<<<<<<<<<<", token);

        await SecureStore.setItemAsync("token", token);

        setIsLogin(true);
        console.log(error);
      } catch (error) {
        console.log(error);
      }
    },
    onError: (err) => {
      console.log(err);
    },
    fetchPolicy: "network-only",
  });

  const loginPress = async () => {
    await dispatcher({
      variables: {
        email,
        password,
      },
    });
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#2F3D7E"}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#2F3D7E"}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.loginButton}>
          <Button title="Login" onPress={loginPress} />
        </View>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAEAEB",
  },
  logo: {
    alignSelf: "center",
    marginTop: 50,
  },
  card: {
    backgroundColor: "#FAEAEB",
    padding: 20,
    borderRadius: 5,
    marginTop: 200,
    marginLeft: 20,
    marginRight: 20,
  },
  label: {
    fontSize: 16,
    color: "#2F3D7E",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#2F3D7E",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input2: {
    height: 40,
    borderColor: "#2F3D7E",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  showPasswordText: {
    fontSize: 14,
    color: "#808080",
  },
  loginButton: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // paddingTop: 10,
    marginTop: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#007bff",
    textAlign: "center",
    marginTop: 10,
  },
});

export default LoginScreen;
