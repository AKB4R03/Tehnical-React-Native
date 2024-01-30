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
  DO_EDIT_TRANSACTION,
  GET_ONE_TRANSACTION,
  GET_TRANSACTION,
} from "../queries";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";

export default function EditTransactionScreen({ _, route }) {
  const navigation = useNavigation();

  const { transId } = route.params;

  const [nomor, setNomor] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [noTelp, setNoTelp] = useState("");

  const { loading, error, data } = useQuery(GET_ONE_TRANSACTION, {
    variables: {
      transactionId: transId,
    },
  });

  useEffect(() => {
    if (!loading && data && data.readOneTransaction) {
      const transactionData = data.readOneTransaction.data;
      setNomor(transactionData.nomor);
      setTanggal(transactionData.tanggal);
      setKode(transactionData.kode);
      setNama(transactionData.nama);
      setNoTelp(transactionData.noTelp);
    }
  }, [loading, data]);

  // console.log(result, "--------------++++++++++");

  //! for editing
  const [dispatcher] = useMutation(DO_EDIT_TRANSACTION, {
    onCompleted: (res) => {
      console.log(res);
      navigation.navigate("Transaction");
    },
    onError: (error) => {
      console.error("Mutation error:", error.message);
      // Handle error as needed
    },
    refetchQueries: [
      {
        query: GET_TRANSACTION,
      },
    ],
  });

  const addTransPress = () => {
    dispatcher({
      variables: {
        input: {
          nomor,
          tanggal,
          kode,
          nama,
          noTelp,
        },
        transactionId: transId,
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
        <Text style={styles.center}>TRANSAKSI</Text>
        {/* //* nomor  */}
        <Text style={styles.label}>Nomor</Text>
        <TextInput
          placeholder="ex: 001"
          placeholderTextColor={"#2F3D7E"}
          style={styles.input}
          value={nomor}
          onChangeText={setNomor}
        />
        {/* //* Tanggal  */}
        <Text style={styles.label}>Tanggal</Text>
        <TextInput
          placeholder="ex: 1 januari 2022"
          placeholderTextColor={"#2F3D7E"}
          style={styles.input}
          value={tanggal}
          onChangeText={setTanggal}
        />

        <Text style={styles.center2}>CUSTOMER</Text>

        {/* //* Kode  */}
        <Text style={styles.label}>Kode</Text>
        <TextInput
          placeholder="ex: 202011-001"
          placeholderTextColor={"#2F3D7E"}
          style={styles.input}
          value={kode}
          onChangeText={setKode}
        />

        {/* //* Nama  */}
        <Text style={styles.label}>Nama</Text>
        <TextInput
          placeholder="ex: Cust A"
          placeholderTextColor={"#2F3D7E"}
          style={styles.input}
          value={nama}
          onChangeText={setNama}
        />

        {/* //* No Telepon  */}
        <Text style={styles.label}>No Telepon</Text>
        <TextInput
          placeholder="ex: 08131556905"
          placeholderTextColor={"#2F3D7E"}
          style={styles.input}
          value={noTelp}
          onChangeText={setNoTelp}
        />

        <View style={styles.button}>
          <Button title="Simpan" onPress={addTransPress} />
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
