import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import {
  DO_EDIT_STUFF,
  DO_EDIT_TRANSACTION,
  GET_ONE_STUFF,
  GET_STUFF,
} from "../queries";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";

export default function EditStuffScreen({ _, route }) {
  const navigation = useNavigation();

  const { stuffId } = route.params;

  //   console.log(stuffId, "=====id=====");

  const [harga, setHarga] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [total, setTotal] = useState("");

  const { loading, error, data } = useQuery(GET_ONE_STUFF, {
    variables: {
      stuffId: stuffId,
    },
  });

  //   console.log(data, "---------------");

  useEffect(() => {
    if (!loading && data && data.readOneStuff) {
      const stuffData = data.readOneStuff.data;
      setHarga(stuffData.harga.toString());
      setJumlah(stuffData.jumlah.toString());
      setKodeBarang(stuffData.kodeBarang);
      setNamaBarang(stuffData.namaBarang);
      setTotal(stuffData.total);
    }
  }, [loading, data]);

  // console.log(result, "--------------++++++++++");

  console.log(typeof harga, "----------");

  //! for editing
  const [dispatcher] = useMutation(DO_EDIT_STUFF, {
    onCompleted: (res) => {
      console.log(res);
      navigation.navigate("Stuff");
    },
    onError: (error) => {
      console.error("Mutation error:", error.message);
      // Handle error as needed
    },
    refetchQueries: [
      {
        query: GET_STUFF,
      },
    ],
  });

  const editStuffPress = () => {
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
        stuffId: stuffId,
      },
    });
  };

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#15202B", // Sesuaikan warna latar belakang dengan warna Twitter
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 30 }}>Loading...</Text>
      </View>
    );

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
          <Button title="Simpan" onPress={editStuffPress} />
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
  },

  center2: {
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
