function formatTanggal(tanggalString) {
  let namaBulan = [
    "januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
  ];

  // Pisahkan string tanggal menjadi array
  let tanggalArray = tanggalString.toLowerCase().split(" ");

  // Ambil elemen-elemen dari array
  let tanggal = tanggalArray[0];
  let bulan = namaBulan.indexOf(tanggalArray[1]) + 1;
  let tahun = tanggalArray[2];

  // Pad bulan dengan 0 jika kurang dari 10
  bulan = bulan < 10 ? "0" + bulan : bulan;

  // Ubah format tanggal
  let tanggalHasil = tanggal + "-" + bulan + "-" + tahun;

  return tanggalHasil;
}

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

module.exports = {
  formatTanggal,
  rupiah,
};
