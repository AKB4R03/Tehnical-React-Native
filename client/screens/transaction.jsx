import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import { formatTanggal } from "../lib";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { DO_DELETE, GET_TRANSACTION } from "../queries";
import { useNavigation } from "@react-navigation/native";

const TransactionScreen = () => {
  const navigation = useNavigation();

  const { loading, error, data, refetch } = useQuery(GET_TRANSACTION);

  const [dispatcher] = useLazyQuery(DO_DELETE, {
    onCompleted: () => {
      refetch();
    },

    refetchQueries: [
      {
        query: GET_TRANSACTION,
      },
    ],
  });

  if (loading)
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );

  const deletePress = async (transactionId) => {
    try {
      dispatcher({
        variables: {
          transactionId,
        },
      });
      console.log(transactionId, "===========");
    } catch (error) {
      console.log(error.message, "++++++++++====");
    }
  };

  const goToEdit = (transactionId) => {
    navigation.navigate("EditTransaction", {
      transId: transactionId,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.readTransaction.data}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.nomorContainer}>
              {/* //* nomor transaksi  */}
              <Text style={{ fontSize: 18, color: "#2F3D7E" }}>
                {item.kode}
              </Text>
            </View>
            {/* //* nama customer  */}
            <View style={styles.namaContainer}>
              <Text style={{ fontSize: 13, color: "#2F3D7E" }}>
                Nama Customer
              </Text>
            </View>
            <View style={styles.namaCustContainer}>
              <Text
                style={{ fontSize: 15, color: "#2F3D7E", fontWeight: "bold" }}
              >
                {item.nama}
              </Text>
            </View>
            {/* //* Nomor Telepon  */}
            <View style={styles.jumlahBarang}>
              <Text style={{ fontSize: 13, color: "#2F3D7E" }}>
                Nomor Telepon
              </Text>
            </View>
            <View style={styles.jumlah}>
              <Text
                style={{ fontSize: 15, color: "#2F3D7E", fontWeight: "bold" }}
              >
                {item.noTelp}
              </Text>
            </View>
            {/* //* Tanggal  */}
            <View style={styles.TanggalContainer}>
              <Text style={{ fontSize: 13, color: "#2F3D7E" }}>Tanggal</Text>
            </View>
            <View style={styles.TanggalValueContainer}>
              <Text
                style={{ fontSize: 15, color: "#2F3D7E", fontWeight: "bold" }}
              >
                {formatTanggal(item.tanggal)}
              </Text>
            </View>
            {/* //* Nomor  */}
            <View style={styles.totalContainer}>
              <Text style={{ fontSize: 13, color: "#2F3D7E" }}>Nomor</Text>
            </View>
            <View style={styles.numTotalContainer}>
              <Text
                style={{ fontSize: 15, color: "#2F3D7E", fontWeight: "bold" }}
              >
                {item.nomor}
              </Text>
            </View>

            {/* //* Line */}
            <View style={styles.linePosition}>
              <View style={styles.line} />
            </View>

            {/* //* Button Gruop */}
            <View style={styles.ButtonGroupR}>
              <Button title="Hapus" onPress={() => deletePress(item._id)} />
            </View>
            <View style={styles.ButtonGroupL}>
              <Button title="Edit" onPress={() => goToEdit(item._id)} />
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAEAEB",
  },
  card: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 100,
    paddingBottom: 135,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  nomorContainer: {
    position: "absolute",
    top: 15,
    left: 15,
  },

  namaContainer: {
    position: "absolute",
    top: 60,
    left: 15,
  },

  namaCustContainer: {
    position: "absolute",
    top: 80,
    left: 15,
  },

  jumlahBarang: {
    position: "absolute",
    top: 120,
    left: 15,
  },

  jumlah: {
    position: "absolute",
    top: 140,
    left: 15,
  },

  TanggalContainer: {
    position: "absolute",
    top: 60,
    right: 60,
  },

  TanggalValueContainer: {
    position: "absolute",
    top: 80,
    right: 30,
  },

  totalContainer: {
    position: "absolute",
    top: 120,
    right: 65,
  },

  numTotalContainer: {
    position: "absolute",
    top: 140,
    right: 80,
  },

  line: {
    width: "200%",
    height: 1,
    backgroundColor: "#2F3D7E",
    position: "absolute",
  },

  linePosition: {
    top: 80,
    right: 85,
  },

  ButtonGroupR: {
    position: "absolute",
    top: 190,
    right: 90,
  },

  ButtonGroupL: {
    position: "absolute",
    top: 190,
    left: 110,
  },
});

export default TransactionScreen;
