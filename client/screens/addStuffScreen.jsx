import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { DO_ADD_STUFF, GET_STUFF } from "../queries";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";

export default function AddStuffScreen() {
  const navigation = useNavigation();

  const [harga, setHarga] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [total, setTotal] = useState("");

  const [dispatcher] = useMutation(DO_ADD_STUFF, {
    onCompleted: (res) => {
      console.log(res);

      navigation.navigate("Stuff");
    },

    refetchQueries: [
      {
        query: GET_STUFF,
      },
    ],
  });

  const addStuffPress = () => {
    const newHarga = Number(harga);
    const newJumlah = Number(jumlah);
    dispatcher({
      variables: {
        input: {
          harga: newHarga,
          jumlah: newJumlah,
          kodeBarang,
          namaBarang,
        },
      },
    });
    setKodeBarang("");
    setJumlah("");
    setHarga("");
    setNamaBarang("");
    setTotal("");
  };

  return (
    // <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.center}>BARANG</Text>
        {/* //* harga  */}
        <Text style={styles.label}>Harga</Text>
        <TextInput
          placeholder="10000"
          placeholderTextColor={"#2F3D7E"}
          style={styles.input}
          value={harga}
          onChangeText={setHarga}
          keyboardType="numeric"
        />
        {/* //* Tanggal  */}
        <Text style={styles.label}>Jumlah</Text>
        <TextInput
          placeholder="ex: 11"
          placeholderTextColor={"#2F3D7E"}
          style={styles.input}
          value={jumlah}
          onChangeText={setJumlah}
          keyboardType="numeric"
        />

        {/* //* Kode  */}
        <Text style={styles.label}>Kode Barang</Text>
        <TextInput
          placeholder="ex: A001"
          placeholderTextColor={"#2F3D7E"}
          style={styles.input}
          value={kodeBarang}
          onChangeText={setKodeBarang}
        />

        {/* //* Nama  */}
        <Text style={styles.label}>Nama Barang</Text>
        <TextInput
          placeholder="ex: Barang A"
          placeholderTextColor={"#2F3D7E"}
          style={styles.input}
          value={namaBarang}
          onChangeText={setNamaBarang}
        />

        {/* //* No Telepon  */}
        <Text style={styles.label}>Total</Text>
        <TextInput
          placeholder="ex: 18000"
          placeholderTextColor={"#2F3D7E"}
          style={styles.input}
          value={jumlah * harga}
          onChangeText={setTotal}
        />

        <View style={styles.button}>
          <Button title="Simpan" onPress={addStuffPress} />
        </View>
      </View>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAEAEB",
  },

  center: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "900",
    color: "#2F3D7E",
    marginTop: 45,
  },

  input: {
    height: 40,
    borderColor: "#2F3D7E",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },

  button: {
    height: 40,
    paddingHorizontal: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },

  label: {
    fontSize: 16,
    color: "#2F3D7E",
    marginTop: 15,
    marginLeft: 22,
  },
});
