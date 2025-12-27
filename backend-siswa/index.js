const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const siswaRoutes = require('./src/routes/siswaRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// routes dipisah
app.use("/api/siswa", siswaRoutes);

app.listen(PORT, () => {
  console.log(`Server Backend berjalan di http://localhost:${PORT}`);
});
