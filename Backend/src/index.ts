// index.ts
import express from "express";
import router from "./routes";
import dbConnection from "./db-connection"; 
const cors = require('cors');

dbConnection();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from this origin
}));

const port = process.env.PORT || 3000;
const currentDate = new Date().toISOString().split('T')[0];
app.use(express.json());
app.use(router);
app.use(
    cors({
        origin: 'http://localhost:5173', // URL frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
        credentials: true, // Jika menggunakan cookies
    })
);


app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Hello World",
    data: {
        date: currentDate,
    },
    
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
