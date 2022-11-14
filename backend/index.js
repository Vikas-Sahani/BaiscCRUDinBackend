import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(cors()); // without this, our backend server will not allow to make any api request, so we are using cors function so that it can allow the api request
app.use(express.json()); //by default we can't send the any data to our express server so to prevent from this we use this middleware       
// (in Lecture [July21-22] `server.use(express.urlencoded({extended:true}))` => for deconding body)

// if there is a auth problem                                                                                // 00.24.30
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Lamadev123';

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vikas",
  database: "test",
});
db.connect((err)=>{
  if(!err) return console.log("connected to mysql db");
  return console.log(err);
});

app.get("/", (req, res) => {
  console.log("before hello world => ", db)
  res.json("hello world");
});

app.get("/books", (req, res) => {
  // const q = "SELECT * FROM books";
  const q = "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Lamadev123'";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log("this is the data => ",data)
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(404).send(err);
    return res.status(200).json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

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

app.listen(8800, () => {
  console.log("Connected to backend.");
});














// ----------------------============------------===============-----------============

// import express from "express";  //if we want to use ES6 syntax for importing something then we should do ("type":"module") inside ("package.json")
// import mysql from "mysql"; //drive for MySQL

// const app = express()

// // conecting express and MySQL
// const db = mysql.createConnection({
//     host:"localost",
//     user:"root",
//     password:"Vikas#Nov12",
//     database:"vk"
// })

// app.get("/",(req, res)=>{
//     res.json("hello this is the backend")
// })

// app.get("/books", (req, res)=>{
//     const q = "SELECT * FROM books";
//     db.query(q,(error, data)=>{
//         if(err) return res.json(error); // if error then show error msg
//         return res.json(data) //else show data 
//     })
// })

// app.listen(8800, ()=>{
//     console.log("Connected to backend")
// })

