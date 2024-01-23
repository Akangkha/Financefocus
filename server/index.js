import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/Transaction.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 9000;
// const uri=process.env.MONGO_URL

// async function fetching() {
//   const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

//   try {
//     await mongoose.connect(uri, connectionParams);
//     console.log('Database connected successfully');

//     app.listen(PORT, () => {
//       console.log("Server is running on port", PORT);
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

// fetching()

//rputes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://financefocus.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT} `));
    // await mongoose.connection.db.dropDatabase;
    // await KPI.insertMany(kpis);
    // await Product.insertMany(products);
    // await mongoose.connection.db.dropDatabase;
    // await Transaction.insertMany(transactions);
    // await Transaction.insertMany(transactions);
    // const uploadedTrans= await Transaction.find();
    // console.log(uploadedTrans);
  })

  .catch((error) => console.log(`${error} did not connect`));
