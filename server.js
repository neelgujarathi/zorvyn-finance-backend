import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

dotenv.config();

const app = express();

app.use(express.json());

// CORS (keep this)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Connect DB ONLY ONCE
connectDB();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get("/api", (req, res) => {
  res.send("API is working 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/users", userRoutes);

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));