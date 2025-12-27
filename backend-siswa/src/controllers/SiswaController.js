const db = require("../config/db");

class SiswaController {

    
  getAllSiswa(req, res) {
    const sql = "SELECT * FROM siswa";
    db.query(sql, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  }

  createSiswa(req, res) {
    const {
      nama_siswa,
      alamat_siswa,
      tgl_siswa,
      jurusan_siswa,
    } = req.body;

    const sql = `
  INSERT INTO siswa (
    kode_siswa,
    nama_siswa,
    alamat_siswa,
    tgl_siswa,
    jurusan_siswa
  )
  SELECT
    CONCAT(
      'S-',
      LPAD(
        IFNULL(MAX(CAST(SUBSTRING(kode_siswa, 3) AS UNSIGNED)), 0) + 1,
        3,
        '0'
      )
    ),
    ?, ?, ?, ?
  FROM siswa
`;

    console.log("CREATE SISWA TERPANGGIL", req.body);

    db.query(
      sql,
      [nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa],
      (err) => {
        if (err) {
          console.error("Error SQL:", err);
          return res.status(500).json({
            error: err.sqlMessage || "Gagal menyimpan data",
          });
        }

        return res.status(200).json({
          message: "Data berhasil disimpan!",
        });
      }
    );
  }


  updateSiswa(req, res) {
    const id = req.params.id;
    const {
      nama_siswa,
      alamat_siswa,
      tgl_siswa,
      jurusan_siswa,
    } = req.body;

    const sql =
      "UPDATE siswa SET nama_siswa=?, alamat_siswa=?, tgl_siswa=?, jurusan_siswa=? WHERE id=?";
    const values = [
      nama_siswa,
      alamat_siswa,
      tgl_siswa,
      jurusan_siswa,
      id,
    ];

    db.query(sql, values, (err) => {
      if (err) {
        console.error("Error SQL:", err);
        return res.status(500).json(err);
      }
      res.status(200).json({ message: "Data berhasil diupdate!" });
    });
  }

  deleteSiswa(req, res) {
    const id = req.params.id;
    const sql = "DELETE FROM siswa WHERE id = ?";
    db.query(sql, [id], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: "Data berhasil dihapus!" });
    });
  }
}

module.exports = new SiswaController();
