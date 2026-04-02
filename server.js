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

// 🔥 1. CORS FIRST (VERY IMPORTANT)
app.use(cors({
  origin: "*", // TEMP (later restrict)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

// 🔥 2. BODY PARSER AFTER CORS
app.use(express.json());

// DB
connectDB();

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get("/api", (req, res) => {
  res.send("API is working 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/users", userRoutes);

// 🔥 3. USE DYNAMIC PORT (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));