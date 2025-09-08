import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import connectedDatabase from "./configs/connect-db.js";
import { AuthRouter, CustomerRouter, OrderRouter, ProductRouter } from "./routes/index.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT;
connectedDatabase();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", AuthRouter);
app.use("/customers", CustomerRouter);
app.use("/orders", OrderRouter);
app.use("/products", ProductRouter);

// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: "false",
//     message: "Page not found",
//     error: {
//       statusCode: 404,
//       message: "You reached a route that is not defined on this server",
//     },
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
