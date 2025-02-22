import express from "express";
import cors from "cors";

import { resourceRoutes } from "./routes";
import { connectDB } from "./configs";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resources", resourceRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
