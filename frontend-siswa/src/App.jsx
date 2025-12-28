import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [siswaList, setSiswaList] = useState([]);

  const [formData, setFormData] = useState({
    nama_siswa: "",
    alamat_siswa: "",
    tgl_siswa: "",
    jurusan_siswa: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    msg: "",
  });

  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/siswa");
      setSiswaList(res.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertInfo({ show: false, type: "", msg: "" });

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/api/siswa/${editId}`,
          formData
        );
        showAlert("success", "Data berhasil diperbarui!");
      } else {
        await axios.post("http://localhost:3000/api/siswa", formData);
        showAlert("success", "Siswa berhasil ditambahkan!");
      }

      resetForm();
      fetchSiswa();
    } catch (err) {
      showAlert(
        "danger",
        err.response?.data?.error || "Terjadi kesalahan sistem"
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus data ini?")) {
      await axios.delete(`http://localhost:3000/api/siswa/${id}`);
      fetchSiswa();
    }
  };

  const handleEdit = (s) => {
    setFormData({
      nama_siswa: s.nama_siswa,
      alamat_siswa: s.alamat_siswa,
      tgl_siswa: s.tgl_siswa
        ? new Date(s.tgl_siswa).toISOString().split("T")[0]
        : "",
      jurusan_siswa: s.jurusan_siswa,
    });
    setIsEditing(true);
    setEditId(s.id);
  };

  const resetForm = () => {
    setFormData({
      nama_siswa: "",
      alamat_siswa: "",
      tgl_siswa: "",
      jurusan_siswa: "",
    });
    setIsEditing(false);
    setEditId(null);
  };

  const showAlert = (type, msg) => {
    setAlertInfo({ show: true, type, msg });
    setTimeout(
      () => setAlertInfo({ show: false, type: "", msg: "" }),
      3000
    );
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <nav className="navbar navbar-dark bg-primary shadow mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold">🎓 SISWA UJK</span>
        </div>
      </nav>

      <div className="container">
        {alertInfo.show && (
          <div className={`alert alert-${alertInfo.type}`}>
            {alertInfo.msg}
          </div>
        )}

        <div className="row">
          {/* FORM */}
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="fw-bold mb-3">
                  {isEditing ? "Edit Siswa" : "Tambah Siswa"}
                </h5>

                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control mb-2"
                    name="nama_siswa"
                    placeholder="Nama"
                    value={formData.nama_siswa}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    className="form-control mb-2"
                    name="alamat_siswa"
                    placeholder="Alamat"
                    value={formData.alamat_siswa}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="date"
                    className="form-control mb-2"
                    name="tgl_siswa"
                    value={formData.tgl_siswa}
                    onChange={handleChange}
                    required
                  />
                  <select
                    className="form-select mb-3"
                    name="jurusan_siswa"
                    value={formData.jurusan_siswa}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Jurusan</option>
                    <option value="RPL">RPL</option>
                    <option value="TKJ">TKJ</option>
                    <option value="MM">MM</option>
                  </select>

                  <button className="btn btn-primary w-100">
                    {isEditing ? "Update" : "Simpan"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* TABEL */}
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Data Siswa</h5>

                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-primary">
                    <tr className="text-center">
                      <th>Kode</th>
                      <th>Nama</th>
                      <th>Alamat</th>
                      <th>Tgl Lahir</th>
                      <th>Jurusan</th>
                      <th className="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siswaList.map((s) => (
                      <tr key={s.id} className="text-center">
                        <td className="fw-bold text-primary">
                          {s.kode_siswa}
                        </td>
                        <td>{s.nama_siswa}</td>
                        <td>{s.alamat_siswa}</td>
                        <td>
                          {new Date(s.tgl_siswa).toLocaleDateString("id-ID")}
                        </td>
                        <td>{s.jurusan_siswa}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-warning btn-sm me-1"
                            onClick={() => handleEdit(s)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(s.id)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
