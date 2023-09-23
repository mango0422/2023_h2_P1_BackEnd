import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "192.168.56.102",
  user: "root",
  port: 3306,
  password: "1234",
  database: "webappdb",
  connectionLimit: 10,
  dialect: "mysql"
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/members", (req, res) => {
  const q = "SELECT * FROM members";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/members", (req, res) => {
  const q = "INSERT INTO members(`id`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/members/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM members WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/members/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE members SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(4000, () => {
  console.log("Connected to backend.");
});
